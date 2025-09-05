// /path/to/your/project/resources/js/Utils/helpers.js

/**
 * A helper function to determine and return a string-based icon
 * for a given file name based on its extension.
 * @param {string} fileName The name of the file, including its extension.
 * @returns {string} The appropriate icon.
 */
export function getFileIcon(fileName) {
    // If the input is an object (like the media object from Spatie),
    // extract the file_name property.
    const name = typeof fileName === 'string' ? fileName : fileName.file_name;

    // Check for a valid file name before proceeding.
    if (!name) {
        return '📁'; // Default folder icon
    }

    // Get the file extension and convert it to lowercase.
    const ext = name.split('.').pop().toLowerCase();

    // Return an icon based on the file extension.
    switch (ext) {
        case 'pdf':
            return '📄'; // Document icon
        case 'doc':
        case 'docx':
            return '📝'; // Text document icon
        case 'xls':
        case 'xlsx':
            return '📊'; // Spreadsheet icon
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
            return '🖼️'; // Image icon
        case 'zip':
        case 'rar':
        case '7z':
            return '📦'; // Archive icon
        case 'mp4':
        case 'mov':
        case 'avi':
            return '🎬'; // Video icon
        case 'mp3':
        case 'wav':
        case 'flac':
            return '🎧'; // Audio icon
        default:
            return '📁'; // Generic file/folder icon
    }
}
