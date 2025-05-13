/**
 * @name XiaoThemePlugin
 * @author Adrien5902
 * @description Plugin for XiaoTheme by Adrien5902
 * @version 0.0.1
 */

let videoBg;

const logoClass = ".wrapper_cc5dd2";

module.exports = class XiaoThemePlugin {
    start() {
        for (let i = 0; i <= 25; i++) {
            setTimeout(() => {
                spawnLantern()
            }, Math.random() * 30000)
        }

        videoBg = document.createElement("video");
        document.body.appendChild(videoBg)
        videoBg.autoplay = true;
        videoBg.loop = true;
        videoBg.controls = false;
        videoBg.src = "https://v1.pinimg.com/videos/mc/720p/3c/84/0b/3c840b410668f170f82c0d57313ef87e.mp4"
        videoBg.width = window.innerWidth
        videoBg.classList.add("video_bg")
        window.addEventListener("resize", () => {
            videoBg.width = window.innerWidth
        })

        if (!document.getElementById("xiao_logo")) {
            document.querySelector(".wrapper_cc5dd2 > svg").style.opacity = "0"
            const logo = document.createElement("img")
            logo.id = "xiao_logo"
            logo.src = "https://i.imgur.com/xbTmLvD.png"
            logo.style.width = "100%"
            document.querySelector(".wrapper_cc5dd2").appendChild(logo)
        }

        function updateFills() {
            // biome-ignore lint/complexity/noForEach: <explanation>
            document.querySelectorAll('[fill="#43a25a"]').forEach(el => {
                el.setAttribute("fill", "#a7d7b0");
            });
        }

        updateFills();

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    updateFills();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    stop() {
        // biome-ignore lint/complexity/noForEach: <explanation>
        document.querySelectorAll("xiao_lantern").forEach(el => el.remove())
        videoBg.remove()
    }
};

function spawnLantern() {
    const root = document.getElementById("app-mount");
    const el = document.createElement("img");
    el.src = "https://static.wikia.nocookie.net/gensin-impact/images/1/1a/Item_Xiao_Lantern.png";
    el.classList.add("xiao_lantern")
    el.style.height = `${(Math.random() * 4 + 5).toString()}vh`
    const lastX = { current: Math.random() * window.innerWidth };
    root.appendChild(el)

    function moveAnim() {
        const offset = (Math.random() - 0.5) * 150 - (Math.random()) * 100;
        lastX.current = lastX.current + offset
        el.animate([
            { transform: `translateX(${lastX.current}px)` },
        ], { duration: 2000, fill: "forwards" })
    }

    moveAnim()
    setInterval(() => {
        moveAnim()
    }, 2000)

    function moveLantern() {
        const duration = Math.random() * 10000 + 20000;

        lastX.current = Math.random() * window.innerWidth;
        el.style.animation = "unset";
        el.style.transform = `translateX(${lastX.current}px)`
        setTimeout(() => {
            el.style.animation = `lantern ${duration}ms`;
        }, 4000)

        setTimeout(() => {
            moveLantern()
        }, duration + 4000)
    }

    moveLantern()
}