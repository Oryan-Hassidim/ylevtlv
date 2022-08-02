var scrollingFunctions = [];
window.addEventListener('scroll', () => {
    scrollingFunctions.forEach(func => {
        func();
    });
}, false);

function loadNavbar(current = null) {
    $.get('/navbar.html', {
            '_': $.now()
        } // Prevents caching
    ).done(function(html) {
        const nav = $("header[data-nav='nav']").html(html);
        nav.find(' .d-lg-block.d-xl-block>a.dropdown-toggle ').click(function() {
            window.location = $(this).attr('href');
        });
        if (current != null) {
            nav.find('a[href$="' + current + '"]').addClass("current");
        }
    }).fail(function(jqXHR, textStatus) {});
}

function loadHalfs() {
    const half = $(" .half ");
    const btn = half.append('<div class="continue-btn"><button type="button" class="btn btn-primary btn-lg">להמשך...</button></div>');
    btn.find(" div.continue-btn > button").click(function() {
        $(this).parent(" div.continue-btn ").parent(" .half ").removeClass(" half ");
        $(this).parent(" div.continue-btn ").hide();
    });
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + window.innerHeight;

    if (elem.length > 0) {
        var elemTop = elem.offset().top;
        var elemBottom = elemTop + elem.height();
        const i1 = (elemBottom <= docViewBottom);
        const i2 = (elemTop >= docViewTop);
        return (i1 && i2);
    }
    return false;
}

function loadParallax() {
    const myparallax = $(" .myparallax ");
    if (myparallax.length > 0) {
        const osrc = myparallax.children("img").attr("src");
        const src = osrc.replace(" ", "\\ ");
        myparallax.css("background-image", "url(" + src + ")");

        scrollingFunctions.push(function() {
            const e = myparallax;
            for (let i = 0; i < e.length; i++) {
                const rect = e.getBoundingClientRect();
                var pos = (rect.top / (window.innerHeight + rect.height / 2) * 100) + "%";
                e[i].style.backgroundPositionY = pos;
            }
        });
    }
}

$("textarea").change(function(event) {
    const v = $(this);
    v.attr("value", (v.val() === "" ? " " : v.val()));
});

function rabanim() {
    var inview = false;
    const elem = $(' .tile-container:nth-of-type(1) ');
    scrollingFunctions.push(function() {
        if (!inview) {
            if (isScrolledIntoView(elem)) {
                var demo1 = document.querySelector('#demo-1')
                var demo2 = document.querySelector('#demo-2')

                setTimeout(() => {
                    demo2.checked = true
                }, 0)
                setTimeout(() => {
                    demo2.checked = false
                }, 1500)
                setTimeout(() => {
                    demo1.checked = true
                }, 2000)
                setTimeout(() => {
                    demo1.checked = false
                }, 3000)
                inview = true;
            }
        }
    });
    const date = new Date();
    const h = date.getHours();
    if (0 < h && h < 5) {
        $(" .app .tile-container:nth-of-type(6) h5 ")
            .html("עדי נעים ספקטור");
    }
}

function registerForm() {
    const registerForm = $(" #registerForm ");
    registerForm.submit(function(event) {
        event.preventDefault();
        registerForm.find("#submit")
            .addClass("submitted")
            .delay(350)
            .animate({
                opacity: "0"
            }, 100);
        registerForm.find(".spinner")
            .delay(330)
            .fadeIn();
        var $form = $(this),
            details = {
                name: registerForm.find("#name").val(),
                email: registerForm.find("#email").val(),
                phone: registerForm.find("#phone").val(),
                message: registerForm.find("#message").val()
            },
            url = "https://ylevtlv.azurewebsites.net/api/RegisterDetails?code=Af0XKw7PiTsvuKDgF6anNZzSeNijZpSvKAB8XESvx476KlcXN1ZvdA==";
        var posting = $.post(url, JSON.stringify(details), function(data) {
            if (data == 204) {
                const h = "<div><p>בקשתך התקבלה ונשתדל לשוב אליך בהקדם🙃</p></div>";
            } else {
                const h = "<div><p>הייתה בעיה בקשר עם השרתים😒</p><p>נסה אולי לפנות אלינו דרך הוואטסאפ...</p></div>"
            }
            $("#sumbitDiv").html(h);
        });
    });
}

function contributeForm() {
    const registerForm = $(" #detailsForm ");
    registerForm.submit(function(event) {
        event.preventDefault();
        registerForm.find("#submit")
            .addClass("submitted")
            .delay(350)
            .animate({
                opacity: "0"
            }, 100);

        registerForm.find(".spinner")
            .delay(330)
            .fadeIn();
        var pay_option = "Yaad";
        if ($("#paybox").is(":checked")) {
            pay_option = "PayBox";
        } else if ($("#debit").is(":checked")) {
            if ($("#reciet").is(":checked")) {
                pay_option = "Aish";
            } else {
                pay_option = "Yaad";
            }
        } else if ($("#view-bank-details").is(":checked")) {
            if ($("#reciet").is(":checked")) {
                pay_option = "BankTransferAish";
            } else {
                pay_option = "BankTransferMechonYair";
            }
        }

        if (registerForm.find("#months").val() != undefined && registerForm.find("#months").val() > 1) {
            var $form = $(this),
                details = {
                    name: registerForm.find("#name").val(),
                    amount: registerForm.find("#amount").val(),
                    repeat: true,
                    months: registerForm.find("#months").val()
                },
                url = "https://ylevtlv.azurewebsites.net/api/Contribute?code=Cti-yoFy3ifJG60NfV133octc_oHcNOl5lMjHjvERy5XAzFuueYpcQ=="
        } else {
            var $form = $(this),
                details = {
                    name: registerForm.find("#name").val(),
                    amount: registerForm.find("#amount").val(),
                    repeat: false
                },
                url = "https://ylevtlv.azurewebsites.net/api/Contribute?code=Cti-yoFy3ifJG60NfV133octc_oHcNOl5lMjHjvERy5XAzFuueYpcQ=="
        }
        var posting = $.post(url, JSON.stringify(details), function(data) {
            if (data == 204) {
                const h = "<div><p>בקשתך התקבלה ונשתדל לשוב אליך בהקדם🙃</p></div>";
                $("#sumbitDiv").html(h);
            } else {
                const h = "<div><p>הייתה בעיה בקשר עם השרתים😒</p></div>"
                $("#sumbitDiv").html(h);
            }
            if (pay_option === "PayBox")
                location.assign("https://payboxapp.page.link/sKXxfojXwVXgcd3J9");
            else if (pay_option === "Aish")
                location.assign('https://aishglobal.formtitan.com/ft9df2a10c1644317397601_copy?fld13=416669#/');
            else if (pay_option === "Yaad")
                location.assign('https://icom.yaad.net/p/?action=pay&PassP=1234&Masof=4500341429&HK=True&OnlyOnApprove=True&sendemail=True&UTF8=True&UTF8out=True&Info=DirectDebit&Coin=1&PageLang=HEB');
            else
                $("#collapseFour").collapse('show');
        });
    });
}

function transfer() {
    $("#view-reciet").prop("checked", true);
    $("#collapseTwo").collapse('show');
}

function debit() {
    $("#view-reciet").prop("checked", true);
    $("#collapseTwo").collapse('show');
}

function paybox() {
    $("#view-reciet").prop("checked", false);
    $("#collapseThree").collapse('show');
}

function reciet() {
    $("#collapseThree").collapse('show');
}


class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
    setNext(next) {
        this.next = next;
        this.next.previous = this;
    }
}

function setCircularList(list) {
    if (list.length === 0) return null;
    if (list.length === 1) {
        let node = new ListNode(list[0]);
        node.setNext(node);
        return node;
    }
    let node1 = new ListNode(list[0]);
    var node = node1;
    for (const element of list.slice(1)) {
        const n = new ListNode(element);
        node.setNext(n);
        node = n;
    }
    node.setNext(node1);
    return node;
}