<?php
/*
$spreadsheet_url="https://docs.google.com/spreadsheet/pub?key=<somecode>&single=true&gid=0&output=csv";
https://docs.google.com/spreadsheets/d/1Ss8ZX1WPXyaVAX7PGTHdUJ0gAy81_prF8l69q2gDPl0/pubhtml?widget=true&amp;headers=false
*/
$spreadsheet_url="https://docs.google.com/spreadsheets/d/1Ss8ZX1WPXyaVAX7PGTHdUJ0gAy81_prF8l69q2gDPl0/pubhtml/export?gid=0&fo‌​rmat=csv";

if(!ini_set('default_socket_timeout', 15)) echo "<!-- unable to change socket timeout -->";

if (($handle = fopen($spreadsheet_url, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $spreadsheet_data[] = $data;
    }
    fclose($handle);
}
else
    die("Problem reading csv");

echo "<p>", $spreadsheet_data[1], "</p>";

?>