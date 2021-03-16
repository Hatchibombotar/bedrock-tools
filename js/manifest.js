window.onkeydown = function () {
    setTimeout(() => {//small pause needed for text to appear
        createFile()
    }, 100)
}
function createFile() {
    // var min_version_1 = document.getElementById("file.header.min_engine_version[0]").value
    // var min_version_2 = document.getElementById("file.header.min_engine_version[1]").value
    // var min_version_3 = document.getElementById("file.header.min_engine_version[2]").value

    console.log(document.getElementById("file.header.name").value)
    var template = {
        "format_version": 2,
        "header": {
            "name": "",
            "description": "",
            "uuid": "",
            "version": [],
            "min_engine_version": []
        },
        "modules": [
            {
                "type": "",
                "uuid": "",
                "version": []
            }
        ]
    };
    template.header.name = document.getElementById("file.header.name").value;
    template.header.description = document.getElementById("file.header.description").value;
    template.header.uuid = createUUID();
    template.modules[0].uuid = createUUID();
    template.modules[0].type = document.getElementById("file.modules[0].type").value;
    template.header.version[0] = parseInt(document.getElementById("file.header.version[0]").value);
    template.header.version[1] = parseInt(document.getElementById("file.header.version[1]").value);
    template.header.version[2] = parseInt(document.getElementById("file.header.version[2]").value);
    template.modules[0].version[0] = parseInt(document.getElementById("file.header.version[0]").value);
    template.modules[0].version[1] = parseInt(document.getElementById("file.header.version[1]").value);
    template.modules[0].version[2] = parseInt(document.getElementById("file.header.version[2]").value);
    // template.modules[1].version[0] = parseInt(document.getElementById("file.header.version[0]").value);
    // template.modules[1].version[1] = parseInt(document.getElementById("file.header.version[1]").value);
    // template.modules[1].version[2] = parseInt(document.getElementById("file.header.version[2]").value);

    template.header.min_engine_version[0] = parseInt(document.getElementById("file.header.min_engine_version[0]").value);
    template.header.min_engine_version[1] = parseInt(document.getElementById("file.header.min_engine_version[1]").value);
    template.header.min_engine_version[2] = parseInt(document.getElementById("file.header.min_engine_version[2]").value);

    if (document.getElementById("toggle.metadata").checked == true) {
        template.metadata = { license: document.getElementById("file.metadata.license").value, url: document.getElementById("file.metadata.url").value, authors: [document.getElementById("file.metadata.authors").value] }
    }
    if (document.getElementById("file.modules[0].type").value == "client_data") {
        template.modules[1] = { "type": "data", "uuid": createUUID(), "version": [] };
        template.modules[1].version[0] = parseInt(document.getElementById("file.header.version[0]").value);
        template.modules[1].version[1] = parseInt(document.getElementById("file.header.version[1]").value);
        template.modules[1].version[2] = parseInt(document.getElementById("file.header.version[2]").value);
    }
    if (document.getElementById("advanced").checked == true) {
        // if (min_version_1 == 0 && min_version_2 == 0 && min_version_3 == 0) { } else {
        //     template.header.min_engine_version = [parseInt(min_version_1), parseInt(min_version_2), parseInt(min_version_3)];
        // }
        if (document.getElementById("capabilities").checked == true) {
            if (document.getElementById("worlds_only").checked == true) {
                template.header.pack_scope = "world";

            }
            if (document.getElementById("chemistry").checked == true) {
                template.capabilities = ["chemistry"];
            }
            if (document.getElementById("experimental_ui").checked == true) {
                template.capabilities = ["experimental_custom_ui"];
            }
            if (document.getElementById("experimental_ui").checked == true && document.getElementById("chemistry").checked == true) {
                template.capabilities = ["chemistry", "experimental_custom_ui"];
            }
        }
    }

    var content = JSON.stringify(template, null, 2);
    document.getElementById('output').innerHTML = content;
    var element = document.getElementById('output');
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
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
    var checkBox = document.getElementById("toggle.metadata");
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
