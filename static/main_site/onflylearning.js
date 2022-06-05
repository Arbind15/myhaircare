var sliderIndex = 0;
var data = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '124', ''];
const countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Republic of the', 'Congo, Democratic Republic of the', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia, Federated States of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City (Holy See)', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
var oneRoundFlag = 0;
var reUse = 0;
var ntfs_id = 0;
var sel_elm = document.getElementById('region');
for (i = 0; i < countryList.length; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    if (countryList[i] == 'Nepal') {
        opt.selected = true;
    }
    opt.innerHTML = countryList[i].toString();
    sel_elm.appendChild(opt);
}

function SelectGender(index) {
    var coll = document.getElementsByClassName('each_gen');
    var cur_col = coll.item(parseInt(index));
    cur_col.setAttribute('class', 'each_gen selectedG');
    cur_col.children[0].style.display = 'block';
    for (i = 0; i < coll.length; i++) {
        if (i != parseInt(index)) {
            coll.item(i).setAttribute('class', 'each_gen');
            coll.item(i).children[0].style.display = 'none';
        }
    }
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function SaveAge() {
    var age = document.getElementById('age').value;
    age = parseInt(age);
    if (!isNaN(age)) {
        document.getElementById('age_err').style.display = 'none';
        data[sliderIndex] = age.toString();
        document.getElementById('nxt_btn').removeAttribute('disabled');
        if (oneRoundFlag == 1) {
            document.getElementById('save_btn').removeAttribute('disabled');
            document.getElementById('save_btn').setAttribute('class', 'btn1');
        }
    } else {
        data[sliderIndex] = '';
        document.getElementById('age_err').style.display = 'block';
        document.getElementById('nxt_btn').setAttribute('disabled', 'true');
        if (oneRoundFlag == 1) {
            document.getElementById('save_btn').setAttribute('disabled', 'true');
            document.getElementById('save_btn').setAttribute('class', 'btn1 dis_btn');
        }
    }
}

function SelectRelation(index) {
    var coll = document.getElementsByClassName('each_rel');
    var cur_col = coll.item(parseInt(index));
    cur_col.setAttribute('class', 'each_rel selectedG');
    cur_col.children[0].style.display = 'block';
    for (i = 0; i < coll.length; i++) {
        if (i != parseInt(index)) {
            coll.item(i).setAttribute('class', 'each_rel');
            coll.item(i).children[0].style.display = 'none';
        }
    }
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetFather(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetMother(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetGFather(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetGMother(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetSiblings(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetPregnant(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetRadiation(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function SelectHairLine(index) {
    var coll = document.getElementsByClassName('each_hairline');
    var cur_col = coll.item(parseInt(index));
    cur_col.setAttribute('class', 'each_hairline selectedG');
    cur_col.children[0].style.display = 'block';
    for (i = 0; i < coll.length; i++) {
        if (i != parseInt(index)) {
            coll.item(i).setAttribute('class', 'each_hairline');
            coll.item(i).children[0].style.display = 'none';
        }
    }
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}


function SelectStyle(index) {
    var coll = document.getElementsByClassName('each_style');
    var cur_col = coll.item(parseInt(index));
    cur_col.setAttribute('class', 'each_style selectedG');
    cur_col.children[0].style.display = 'block';
    for (i = 0; i < coll.length; i++) {
        if (i != parseInt(index)) {
            coll.item(i).setAttribute('class', 'each_style');
            coll.item(i).children[0].style.display = 'none';
        }
    }
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function SelectDensity(index) {
    var coll = document.getElementsByClassName('each_density');
    var cur_col = coll.item(parseInt(index));
    cur_col.setAttribute('class', 'each_density selectedG');
    cur_col.children[0].style.display = 'block';
    for (i = 0; i < coll.length; i++) {
        if (i != parseInt(index)) {
            coll.item(i).setAttribute('class', 'each_density');
            coll.item(i).children[0].style.display = 'none';
        }
    }
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function SaveHRate() {
    var age = document.getElementById('Hrate').value;
    age = parseInt(age);
    if (!isNaN(age)) {
        document.getElementById('rate_err').style.display = 'none';
        data[sliderIndex] = age.toString();
        document.getElementById('nxt_btn').removeAttribute('disabled');
        if (oneRoundFlag == 1) {
            document.getElementById('save_btn').removeAttribute('disabled');
            document.getElementById('save_btn').setAttribute('class', 'btn1');
        }
    } else {
        data[sliderIndex] = '';
        document.getElementById('rate_err').style.display = 'block';
        document.getElementById('nxt_btn').setAttribute('disabled', 'true');
        if (oneRoundFlag == 1) {
            document.getElementById('save_btn').setAttribute('disabled', 'true');
            document.getElementById('save_btn').setAttribute('class', 'btn1 dis_btn');
        }
    }
}

function GetInfection(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetItch(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetNutrition(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetWeight(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetChemical(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetSleeping(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetMedication() {
    var checkedValue = '0';
    var inputElements = document.getElementsByClassName('Medication');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            checkedValue = checkedValue + inputElements[i].value.toString();
            // console.log(checkedValue);
        }
    }
    data[sliderIndex] = parseInt(checkedValue).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetRegion() {
    var sel_val = document.getElementById('region').value;
    data[sliderIndex] = parseInt(sel_val).toString();
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled');
    }
}

function GetLabel(index) {
    data[sliderIndex] = parseInt(index).toString();
    if (data[sliderIndex] != '') {
        // document.getElementById('nxt_btn').removeAttribute('disabled');
        document.getElementById('save_btn').removeAttribute('disabled');
        document.getElementById('save_btn').setAttribute('class', 'btn1');
        oneRoundFlag = 1;
    }
}

function Next() {
    if(sliderIndex==7 && data[0]=='0'){
        data[8]='0';
        document.getElementById('S' + sliderIndex.toString()).style.display = 'none';
        sliderIndex++;
        document.getElementById('S' + sliderIndex.toString()).style.display = 'block';
    }
    if (sliderIndex >= 22) {
        onFlyPredct();
        document.getElementById('nxt_btn').setAttribute('disabled', 'true');
    } else {
        document.getElementById('nxt_btn').setAttribute('disabled', 'true');
        document.getElementById('S' + sliderIndex.toString()).style.display = 'none';
        sliderIndex++;
        document.getElementById('S' + sliderIndex.toString()).style.display = 'block';
        if (data[sliderIndex] != '') {
            document.getElementById('nxt_btn').removeAttribute('disabled');
        }
        if (sliderIndex >= 22) {
            onFlyPredct();
            document.getElementById('nxt_btn').setAttribute('disabled', 'true');
            if (reUse == 1) {
                document.getElementById('save_btn').removeAttribute('disabled');
                document.getElementById('save_btn').setAttribute('class', 'btn1');
            }
        }
        document.getElementById('pre_btn').removeAttribute('disabled');
        document.getElementById('index_lbl').innerText = (sliderIndex + 1).toString() + '/' + data.length.toString();
    }
    // console.log(data);
}

function Previous() {

    if(sliderIndex==9 && data[0]=='0'){
        data[8]='0';
        document.getElementById('S' + sliderIndex.toString()).style.display = 'none';
        sliderIndex--;
        document.getElementById('S' + sliderIndex.toString()).style.display = 'block';
    }

    document.getElementById('S' + sliderIndex.toString()).style.display = 'none';
    sliderIndex--;
    document.getElementById('S' + sliderIndex.toString()).style.display = 'block';
    if (data[sliderIndex] != '') {
        document.getElementById('nxt_btn').removeAttribute('disabled')
    }
    if (sliderIndex >= 22) {
        document.getElementById('nxt_btn').setAttribute('disabled', 'true');
        if (reUse == 1) {
            document.getElementById('save_btn').removeAttribute('disabled');
            document.getElementById('save_btn').setAttribute('class', 'btn1');
        }
    }
    if (sliderIndex <= 0) {
        document.getElementById('pre_btn').setAttribute('disabled', 'true');
    }
    document.getElementById('index_lbl').innerText = (sliderIndex + 1).toString() + '/' + data.length.toString();
    // console.log(data);
}

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

function SaveSurvey() {

    document.getElementById('save_btn').setAttribute('disabled', 'true');

    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    var Fdata = new FormData();
    Fdata.append('survey', JSON.stringify(data));

    var xhttp = new XMLHttpRequest();
    var url = '/savesurvey/';
    var csrftoken = getCookie('csrftoken');

    var mess = '';
    var ntfs_s = '';

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert(xhttp.responseText);
            if (xhttp.responseText == 'Saved') {
                mess = "Data saved successfully!";
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

                // data = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '124', ''];
                document.getElementById('S' + sliderIndex.toString()).style.display = 'none';
                sliderIndex = 0;
                oneRoundFlag = 0;
                reUse = 1;
                document.getElementById('S' + sliderIndex.toString()).style.display = 'block';
                document.getElementById('index_lbl').innerText = (sliderIndex + 1).toString() + '/' + data.length.toString();
                document.getElementById('nxt_btn').removeAttribute('disabled')
                document.getElementById('pre_btn').setAttribute('disabled', 'true');
                document.getElementById('save_btn').setAttribute('disabled', 'true');
                document.getElementById('save_btn').setAttribute('class', 'btn1 dis_btn');

            } else {
                mess = "Error in data, please re-visit your entries!";
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
        // else {
        //     mess = "Error connecting to server, please try again later!";
        //     ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
        //         '        <div class="each_ntfs_content">\n' +
        //         '            <div>\n' +
        //         '                ' + mess + '\n' +
        //         '            </div>\n' +
        //         '            <div>\n' +
        //         '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
        //         '                    <span aria-hidden="true">&times;</span>\n' +
        //         '                </button>\n' +
        //         '            </div>\n' +
        //         '        </div>\n' +
        //         '    </div>';
        //     htmlObject.innerHTML = ntfs_s;
        //     ntfs_div.appendChild(htmlObject);
        //     ntfs_id++;
        // }

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
    xhttp.send(Fdata);
}

function CloseNtfsBtn(index) {
    document.getElementById('N' + index.toString()).style.display = 'none';
}

function tmp() {
    var ntfs_div = document.getElementById('ntfs');
    var mess = "Message" + ntfs_id.toString();
    var ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
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
        '    </div>'
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = ntfs_s;
    ntfs_div.appendChild(htmlObject);
    ntfs_id++;
}

function onFlyPredct() {
    // alert('onfly');
    var ntfs_div = document.getElementById('ntfs');
    var htmlObject = document.createElement('div');
    var Fdata = new FormData();
    Fdata.append('survey', JSON.stringify(data.slice(0,22)));

    var xhttp = new XMLHttpRequest();
    var url = '/onflypredict/';
    var csrftoken = getCookie('csrftoken');

    var mess = '';
    var ntfs_s = '';

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert(xhttp.responseText);
            var resp = JSON.parse(xhttp.responseText);
            if (resp['message'] == 'predicted') {

                // window.location = window.location.protocol + "//" + window.location.host + "/userresult/" + resp['percent'].toString();

                mess = 'There is ' + resp['percent'] + ' chance that you will face hair fall in near future!';
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
                mess = "Error in data, please re-visit your entries!";
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
        // else {
        //     mess = "Error connecting to server, please try again later!";
        //     ntfs_s = '<div class="each_ntfs err" id="N' + ntfs_id.toString() + '">\n' +
        //         '        <div class="each_ntfs_content">\n' +
        //         '            <div>\n' +
        //         '                ' + mess + '\n' +
        //         '            </div>\n' +
        //         '            <div>\n' +
        //         '                <button type="button" onclick="CloseNtfsBtn(' + ntfs_id.toString() + ')" class="ntfs_cls_btn">\n' +
        //         '                    <span aria-hidden="true">&times;</span>\n' +
        //         '                </button>\n' +
        //         '            </div>\n' +
        //         '        </div>\n' +
        //         '    </div>';
        //     htmlObject.innerHTML = ntfs_s;
        //     ntfs_div.appendChild(htmlObject);
        //     ntfs_id++;
        // }

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
    xhttp.send(Fdata);
}