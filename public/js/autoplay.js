function autoplay(){
    let confirmation = confirm("Would You Like To AutoPlay Music?");
    if (confirmation === true) {
        document.getElementById("audio").play();
    }
}

autoplay();