/**
 * @author Ying Xuan Yeo
 */

//  When user clicks on the button,
// toggle between hiding and showing the dropdown content
function myFunction() {
    document.getElementById("myDropDown").classList.toggle("show");
}


//filter search list
function filterFunction() {
    var input;
    var filter;
    var ul;
    var li;
    var a;
    var i;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropDown");
    a = div.getElementsByTagName("a");

    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}