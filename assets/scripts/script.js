document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".toggle-info");
    const infoContainers = document.querySelector("#info-containers");

    button.addEventListener("click", function() {
        if (infoContainers.style.display === "flex") {
            infoContainers.style.display = "none";
        } else {
            infoContainers.style.display = "flex";
            infoContainers.style.animation = "fadeIn 0.5s";
        }
    });
});
