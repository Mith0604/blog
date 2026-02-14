document.addEventListener("DOMContentLoaded", () => {

    const emailBtn = document.querySelector(".email-btn");

    if (emailBtn) {
        emailBtn.addEventListener("click", sendMail);
    }

});

function sendMail() {

    const email = "mithunbm6@gmail.com";
    const subject = encodeURIComponent("Opportunity Inquiry");
    const body = encodeURIComponent(
        `Hi Mithun,

I came across your portfolio and would like to discuss a potential opportunity.

Best regards,`
    );

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
}
