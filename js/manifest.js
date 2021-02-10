function download(manifest_name, description, author, manifest_type, version) {
    var uuidOne = createUUID();
    var uuidTwo = createUUID();
    var filename = "manifest.json";
    var template = JSON.stringify(getTemplate(), null, 2);


    var mapObj = {
        bedrockTools_description: description,
        bedrockTools_manifestName: manifest_name,
        bedrockTools_uuidOne: uuidOne,
        bedrockTools_uuidTwo: uuidTwo,
        bedrockTool_packType: manifest_type,
        bedrockTools_version: version
    };
    var content = template.replace(/bedrockTools_description|bedrockTools_manifestName|bedrockTools_uuidOne|bedrockTools_uuidTwo|bedrockTool_packType|bedrockTools_version/gi, function (matched) {
        return mapObj[matched];
    });
    document.getElementById('output').innerHTML = content;
    autosize(document.getElementById('output'));
}

// created a v4 uuid
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// fetches the content of the template
function getTemplate() {
    var template = (function () {
        var template = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../templates/manifest_template.json",
            'dataType': "json",
            'success': function (data) {
                template = data;
            }
        });
        return template;
    })();
    return template;
}


// enables advanced options
function advancedSettings() {
    var checkBox = document.getElementById("advanced");
    var settings = document.getElementById("advanced_settings");
    if (checkBox.checked == true) {
        settings.style.display = "block";
    } else {
        settings.style.display = "none";
    }
}

// enables metadata
function metadataSettings() {
    var checkBox = document.getElementById("metadata");
    var settings = document.getElementById("metadata_settings");
    if (checkBox.checked == true) {
        settings.style.display = "block";
    } else {
        settings.style.display = "none";
    }
}

// copies text in output box
function copyText() {
    var outputBox = document.querySelector('#output');
    outputBox.focus();
    outputBox.select();
    try {
        document.execCommand('copy');
    }
    catch (err) {
        alert('Unable to copy');
    }
}

