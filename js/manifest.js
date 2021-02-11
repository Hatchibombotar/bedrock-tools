function download(manifest_name, description, author, manifest_type, version_1, version_2, version_3) {
    var uuidOne = createUUID();
    var uuidTwo = createUUID();
    var filename = "manifest.json";
    var template = {
        "format_version": 2,
        "header": {
            "name": "",
            "description": "",
            "uuid": "",
            "version": []
        },
        "modules": [
            {
                "type": "",
                "uuid": "",
                "version": []
            }
        ]
    };
    template.header.name = manifest_name;
    template.header.description = description;
    template.header.uuid = createUUID();
    template.modules[0].uuid = createUUID();
    template.modules[0].type = manifest_type;
    template.header.version[0] = parseInt(version_1);
    template.header.version[1] = parseInt(version_2);
    template.header.version[2] = parseInt(version_3);
    template.header.min_engine_version = "nin";
    template.modules[0].version[0] = parseInt(version_1);
    template.modules[0].version[1] = parseInt(version_2);
    template.modules[0].version[2] = parseInt(version_3);

    var content = JSON.stringify(template, null, 2);
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

// enables capabilities
function capabilitiesSettings() {
    var checkBox = document.getElementById("capabilities");
    var settings = document.getElementById("capabilities_settings");
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

