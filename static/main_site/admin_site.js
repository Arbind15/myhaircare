var ntfs_id = 0;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function openFileDialog() {
    document.getElementById('csv_upload').click();
    var upload_btn_div = document.getElementById("upload_btn_div");
    var pre_content_btn = upload_btn_div.innerHTML;
    var formData = new FormData();
    var csv_file = document.getElementById("csv_upload");
    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    csv_file.onchange = function () {
        if (csv_file.value.length == 0) {
            return;
        } else {
            upload_btn_div.innerHTML = ' <div class="main_download_csv_btn">\n' +
                '        <div class="download_csv_btn">\n' +
                '            <div class="download_csv_btn22">\n' +
                '                <div class="svg_div">\n' +
                '                    <div class="spinner-border text-light" style="width: 15px; height: 15px;" role="status">\n' +
                '</div>' +
                '                </div>\n' +
                '                <div class="text_div">\n' +
                '                   Uploading...\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>';
            // alert(csv_file.files[0]);
            formData.append("csv", csv_file.files[0]);
            var xhttp = new XMLHttpRequest();
            var url = '/uploadcv/';
            var csrftoken = getCookie('csrftoken');
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var resp = JSON.parse(xhttp.responseText);
                    if (resp['message'] == 'Uploaded') {
                        mess = resp['details'];
                        ntfs_s = '<div class="each_ntfs sucess" id="N' + ntfs_id.toString() + '">\n' +
                            '        <div class="each_ntfs_content">\n' +
                            '            <div>\n' +
                            '                ' + mess + '\n' +
                            '            </div>\n' +
                            '            <div>\n' +
                            '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                            '                    <span aria-hidden="true">&times;</span>\n' +
                            '                </button>\n' +
                            '            </div>\n' +
                            '        </div>\n' +
                            '    </div>';
                    } else {
                        mess = "Something went wrong while uploading CSV file!";
                        ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
                            '        <div class="each_ntfs_content">\n' +
                            '            <div>\n' +
                            '                ' + mess + '\n' +
                            '            </div>\n' +
                            '            <div>\n' +
                            '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                            '                    <span aria-hidden="true">&times;</span>\n' +
                            '                </button>\n' +
                            '            </div>\n' +
                            '        </div>\n' +
                            '    </div>';
                    }
                    htmlObject.innerHTML = ntfs_s;
                    ntfs_div.appendChild(htmlObject);
                    ntfs_id++;
                    upload_btn_div.innerHTML = pre_content_btn;
                }
            };
            xhttp.onerror = function () {
                mess = "Error connecting to server, please try again later!";
                ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
                htmlObject.innerHTML = ntfs_s;
                ntfs_div.appendChild(htmlObject);
                ntfs_id++;
                upload_btn_div.innerHTML = pre_content_btn;
            };

            xhttp.open("post", url, true);
            xhttp.setRequestHeader("X-CSRFToken", csrftoken);
            xhttp.send(formData);

        }
    }
}

// function UploadCsv(){
//     var csv_file = document.getElementById("csv_upload").files[0];
//     alert(csv_file);
//     var formData = new FormData();
//     formData.append("csv", csv_file);
// }


function Train() {

    var train_btn = document.getElementById('train_btn');
    pre_train_btn_content = train_btn.innerHTML;
    train_btn.innerHTML = ' <div class="main_download_csv_btn">\n' +
        '        <div class="download_csv_btn">\n' +
        '            <div class="download_csv_btn22">\n' +
        '                <div class="svg_div">\n' +
        '                    <div class="spinner-border text-light" style="width: 15px; height: 15px;" role="status">\n' +
        '</div>' +
        '                </div>\n' +
        '                <div class="text_div">\n' +
        '                   Training...\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    var xhttp = new XMLHttpRequest();
    var url = '/trainann/';
    var csrftoken = getCookie('csrftoken');
    var mess = '';
    var ntfs_s = '';
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(xhttp.responseText);
            if (resp['message'] == 'Trained') {
                mess = resp['details'];
                ntfs_s = '<div class="each_ntfs sucess" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            } else {
                mess = "Something went wrong while training!";
                ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            }
            htmlObject.innerHTML = ntfs_s;
            ntfs_div.appendChild(htmlObject);
            ntfs_id++;
            train_btn.innerHTML = pre_train_btn_content;
        }
    };
    xhttp.onerror = function () {
        mess = "Error connecting to server, please try again later!";
        ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
            '        <div class="each_ntfs_content">\n' +
            '            <div>\n' +
            '                ' + mess + '\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
        htmlObject.innerHTML = ntfs_s;
        ntfs_div.appendChild(htmlObject);
        ntfs_id++;

        train_btn.innerHTML = pre_train_btn_content;
    };

    xhttp.open("post", url, true);
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
    xhttp.send();
}

function TrainRF() {
    var train_btn = document.getElementById('train_btn_rf');
    pre_train_btn_content = train_btn.innerHTML;
    train_btn.innerHTML = ' <div class="main_download_csv_btn">\n' +
        '        <div class="download_csv_btn">\n' +
        '            <div class="download_csv_btn22">\n' +
        '                <div class="svg_div">\n' +
        '                    <div class="spinner-border text-light" style="width: 15px; height: 15px;" role="status">\n' +
        '</div>' +
        '                </div>\n' +
        '                <div class="text_div">\n' +
        '                   Training...\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    var xhttp = new XMLHttpRequest();
    var url = '/trainrf/';
    var csrftoken = getCookie('csrftoken');
    var mess = '';
    var ntfs_s = '';
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(xhttp.responseText);
            if (resp['message'] == 'Trained') {
                mess = resp['details'];
                ntfs_s = '<div class="each_ntfs sucess" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            } else {
                mess = "Something went wrong while training!";
                ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            }
            htmlObject.innerHTML = ntfs_s;
            ntfs_div.appendChild(htmlObject);
            ntfs_id++;
            train_btn.innerHTML = pre_train_btn_content;
        }
    };
    xhttp.onerror = function () {
        mess = "Error connecting to server, please try again later!";
        ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
            '        <div class="each_ntfs_content">\n' +
            '            <div>\n' +
            '                ' + mess + '\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
        htmlObject.innerHTML = ntfs_s;
        ntfs_div.appendChild(htmlObject);
        ntfs_id++;

        train_btn.innerHTML = pre_train_btn_content;
    };

    xhttp.open("post", url, true);
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
    xhttp.send();
}

function ChangeAlgo() {
    var sel = document.getElementById('algo');
    // alert(sel.value);
    var formData = new FormData();
    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    formData.append("sel", sel.value);
    var xhttp = new XMLHttpRequest();
    var url = '/changealgo/';
    var csrftoken = getCookie('csrftoken');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(xhttp.responseText);
            // alert(resp['message']);
            if (resp['message'] == 'Changed') {
                mess = resp['details'];
                ntfs_s = '<div class="each_ntfs sucess" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            } else {
                mess = "Something went wrong while changing algorithm!";
                ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
                    '        <div class="each_ntfs_content">\n' +
                    '            <div>\n' +
                    '                ' + mess + '\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
                    '                    <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>';
            }
            htmlObject.innerHTML = ntfs_s;
            ntfs_div.appendChild(htmlObject);
            ntfs_id++;
        }
    };
    xhttp.onerror = function () {
        mess = "Error connecting to server, please try again later!";
        ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
            '        <div class="each_ntfs_content">\n' +
            '            <div>\n' +
            '                ' + mess + '\n' +
            '            </div>\n' +
            '            <div>\n' +
            '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
        htmlObject.innerHTML = ntfs_s;
        ntfs_div.appendChild(htmlObject);
        ntfs_id++;
    };
    xhttp.open("post", url, true);
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
    xhttp.send(formData);
}