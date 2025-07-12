<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['test_file'])) {
    $upload_dir = ini_get('upload_tmp_dir') ?: sys_get_temp_dir();
    $temp_path = $_FILES['test_file']['tmp_name'];
    $file_name = $_FILES['test_file']['name'];

    echo "Attempting to handle file: " . htmlspecialchars($file_name) . "<br>";
    echo "Reported temporary path: " . htmlspecialchars($temp_path) . "<br>";
    echo "PHP's upload_tmp_dir: " . htmlspecialchars(ini_get('upload_tmp_dir')) . "<br>";
    echo "System's sys_get_temp_dir: " . htmlspecialchars(sys_get_temp_dir()) . "<br>";

    if (file_exists($temp_path)) {
        echo "SUCCESS: Temporary file EXISTS at: " . htmlspecialchars($temp_path) . "<br>";
        echo "File size: " . filesize($temp_path) . " bytes<br>";

        // Try to move it to a known location
        $destination = __DIR__ . '/uploads/' . basename($file_name);
        if (!is_dir(__DIR__ . '/uploads')) {
            mkdir(__DIR__ . '/uploads', 0777, true);
        }
        if (move_uploaded_file($temp_path, $destination)) {
            echo "SUCCESS: File moved to: " . htmlspecialchars($destination) . "<br>";
        } else {
            echo "ERROR: Failed to move uploaded file. Check permissions on " . htmlspecialchars(__DIR__ . '/uploads') . " and PHP error logs.<br>";
        }
    } else {
        echo "ERROR: Temporary file DOES NOT EXIST at: " . htmlspecialchars($temp_path) . "<br>";
        echo "Upload error code: " . $_FILES['test_file']['error'] . " (0=OK, 1=INI size, 2=FORM size, 3=partial, 4=no file, 6=no temp dir, 7=write fail, 8=extension)<br>";
        echo "Please check php.ini settings (upload_max_filesize, post_max_size, memory_limit) and folder permissions.<br>";
    }
} else {
    ?>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="test_file">
        <input type="submit" value="Upload Test File">
    </form>
    <?php
}
?>
