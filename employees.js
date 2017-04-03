var element = $('#photoEmployees');
function loadLargeImage(image, callback) {
    var img = new Image(),
        removeListeners = function () {
            img.removeEventListener('load', success);
            img.removeEventListener('error', error);
        },
        success = function () {
            removeListeners();
            callback(img);
        },
        error = function () {
            removeListeners();
            callback(null);
        };
    img.addEventListener('load', success);
    img.addEventListener('error', error);
    img.src = image.src.replace('photo/photoSmall', 'photo/photoBig');
}
element.on('click', 'img', function () {
    loadLargeImage(this, function (largeImage) {
        if (largeImage) {
            var preview = $('<div class="preview">');
            preview.append(largeImage);
            preview.on('click', function listener() {
                preview.off('click', listener);
                preview.remove();
            });
            $(document.body).append(preview);
        }
    });
});