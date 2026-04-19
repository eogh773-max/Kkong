// 페이지가 열리자마자 음악 재생 시도
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgm');
    audio.play().catch(() => {
        console.log("자동 재생이 차단되었습니다. 첫 클릭 시 음악이 시작됩니다.");
    });
});

const message = 
`안녕, 엄마! 나 잘 지내고 있어.
벌써 내가 이곳에 온 지 1년이나 됐네?

여기는 맛있는 간식도 진짜 많고,
매일매일 친구들이랑 넓은 들판을 뛰어놀아.
몸도 하나도 안 아프고 기운이 넘쳐!

있지, 나 엄마랑 함께 했던 시간들이 너무 생각이 나. 
엄마가 나 쓰다듬어주던 손길이나 놀아주던 기억들이 자주 생각나더라.
함께 했던 시간들 덕분에 나는 너무 행복했었던 거 같아.

나한테 이런 추억을 만들어줘서 너무 고마워!

엄마, 혹시 내가 없어서 너무 슬퍼하고 있진 않지?

나는 엄마 마음속에 예쁜 추억으로 남아있으니까,
나 때문에 너무 울지 않았으면 좋겠어.
엄마가 웃어야 나도 여기서 더 신나게 놀 수 있거든!

최근에 엄마 감자 남자친구도 생기고, 
푸숑이라는 귀여운 동생도 생겼다면서?! 

물론 나에 비해서 조~금 귀여움은 덜하겠지만 
나는 엄마에게 좋은 일들이 생겨서 너무 기뻐.

그러니까 우리 나중에 꼭 다시 만나자.

엄마가 있어서 나는 정말 행복했어. 고마워 엄마!

그때까지 내가 여기서 제일 예쁜 꽃밭 찾아놓고 기다릴게.
많이 많이 사랑해, 엄마♥️`;

let i = 0;
const speed = 70;
let photoIndex = 0; 
const container = document.querySelector('.container');

// [모바일 대응] px 대신 %를 사용하여, 화면 밖으로 나가지 않고 컨테이너 뒤에서 살짝 튀어나오게 수정
const fixedPositions = [
    { left: "-4%", top: 0, rotate: -15 },  
    { left: "80%", top: 2, rotate: 10 },    
    { left: "-4%", top: 23, rotate: 12 },   
    { left: "80%", top: 25, rotate: -8 },   
    { left: "80%", top: 97, rotate: 15 },
    { left: "-4%", top: 95, rotate: -15 },
];

function startLetter() {
    const audio = document.getElementById('bgm');
    audio.volume = 0.5; 
    audio.play();

    document.getElementById('btn-play').style.display = 'none';
    typeWriter();
}

function spawnSmallPhoto() {
    if (photoIndex >= fixedPositions.length) return; 

    const pos = fixedPositions[photoIndex];
    const img = document.createElement('img');
    
    img.src = `/img/kkong_${photoIndex + 2}.jpg`; 
    img.className = 'floating-photo';
    
    img.style.left = pos.left; // % 문자열 그대로 적용
    img.style.top = `${pos.top}%`;
    img.style.transform = `scale(0) rotate(${pos.rotate}deg)`;

    container.appendChild(img);

    setTimeout(() => {
        img.classList.add('active');
        img.style.transform = `scale(1) rotate(${pos.rotate}deg)`;
    }, 300);

    photoIndex++;
}

function typeWriter() {
    const target = document.getElementById("typewriter");
    target.style.display = 'block';   

    if (i < message.length) {
        target.innerHTML += message.charAt(i);
        
        if (i > 0 && i % 50 === 0) {
            spawnSmallPhoto();
        }

        i++;
        // [스크롤 오류 수정] 윈도우 창이 아닌, 글씨가 써지는 박스 자체를 맨 아래로 스크롤
        target.scrollTop = target.scrollHeight; 
        setTimeout(typeWriter, speed);
    } else {
        const signature = document.getElementById("signature");
        signature.style.display = 'block';
        if (photoIndex < fixedPositions.length) spawnSmallPhoto();
        // [스크롤 오류 수정]
        target.scrollTop = target.scrollHeight; 
    }
}