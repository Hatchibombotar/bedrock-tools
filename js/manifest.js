function download(manifest_name, description, author, manifest_type) {
    var uuidOne = createUUID();
    var uuidTwo = createUUID();
    var filename = "manifest.json";
    var template = getTemplate();

    var mapObj = {
        bedrockTools_description: description,
        bedrockTools_manifestName: manifest_name,
        bedrockTools_uuidOne: uuidOne,
        bedrockTools_uuidTwo: uuidTwo,
        bedrockTool_packType: manifest_type
    };
    content = template.replace(/bedrockTools_description|bedrockTools_manifestName|bedrockTools_uuidOne|bedrockTools_uuidTwo|bedrockTool_packType/gi, function (matched) {
        return mapObj[matched];
    });

    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getTemplate() {
    var template = (function () {
        var template = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "./templates/manifest_template.json",
            'dataType': "json",
            'success': function (data) {
                template = data;
            }
        });
        return template;
    })();
    return template;
}