<?php
/**
 * RS Aesthetics — consultation enquiry handler.
 *
 * Minimal, dependency-free PHP mailer for the "Book a Consultation" form.
 * Runs on any standard cPanel/HostBreak PHP hosting. Astro serves this file
 * from /api/consultation-request.php as a static asset; the PHP runtime on
 * the live server executes it — it will NOT run under `astro dev`/`preview`
 * locally, since those don't execute PHP. Test it after deployment.
 *
 * If the clinic's contact email changes, update it in TWO places:
 * this file, and src/data/clinic.ts (the rest of the site).
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

// Honeypot: a hidden field real visitors never fill in. Bots that fill
// every field trip this, and we silently pretend success.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean_line(string $value): string {
    $value = trim($value);
    // Strip newlines so form fields can't inject extra mail headers.
    return preg_replace('/[\r\n]+/', ' ', $value);
}

$name = clean_line($_POST['name'] ?? '');
$phone = clean_line($_POST['phone'] ?? '');
$concern = clean_line($_POST['concern'] ?? '');
$preferred = clean_line($_POST['preferred'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Name and phone are required.']);
    exit;
}

$to = 'rabiasaif2209@gmail.com';
$subject = 'New consultation request — RS Aesthetics website';

$bodyLines = [
    'New consultation request from the RS Aesthetics website:',
    '',
    "Name: $name",
    "Phone / WhatsApp: $phone",
    'Treatment / concern: ' . ($concern !== '' ? $concern : 'Not specified'),
    'Preferred day/time: ' . ($preferred !== '' ? $preferred : 'Not specified'),
    'Message: ' . ($message !== '' ? $message : '(none)'),
];
$body = implode("\n", $bodyLines);

$fromDomain = preg_replace('/[^a-zA-Z0-9.\-]/', '', $_SERVER['SERVER_NAME'] ?? 'rsaesthetics.pk');
$headers = "From: RS Aesthetics Website <noreply@$fromDomain>\r\n";
$headers .= "Reply-To: noreply@$fromDomain\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Could not send the enquiry email. Please message us on WhatsApp instead.',
    ]);
}
