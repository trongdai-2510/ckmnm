
const movies = [
  { id: 1, name: "Nhà Gia Tiên", poster: "./assets/nhà gia tiên.png", price: "100,000 VNĐ", description: "Phim kinh dị Việt Nam đầy cảm xúc", rating: "T16" },
  { id: 2, name: "Nụ Hôn Bạc Tỷ", poster: "./assets/nụ hôn bạc tỷ.png", price: "90,000 VNĐ", description: "Phim tình cảm hài lãng mạn", rating: "T13" },
  { id: 3, name: "Captain America", poster: "./assets/captian Mỹ.png", price: "120,000 VNĐ", description: "Phim hành động siêu anh hùng", rating: "T13" }
];

const upcomingMovies = [
  { id: 4, name: "Biệt Đội Sấm Sét", poster: "./assets/bietdoisamset.jpg", rating: "T16" },
  { id: 5, name: "Thám Tử Kiên", poster: "./assets/thamtukien.jpg", rating: "T18" },
  { id: 6, name: "Ba Mặt Lật Kèo", poster: "./assets/ba-mat-lat-keo.jpg", rating: "T16" },
  { id: 7, name: "Phim Shin Cậu Bé Bút Chì: Bí Ẩn! Học Viện Hoa Lệ Tenkasu", poster: "./assets/shin-cau-be-but-chi.jpg", rating: "T13" },
  { id: 8, name: "Phim Điện Ảnh Doraemon: Nobita Và Cuộc Phiêu Lưu Vào Thế Giới Trong Tranh", poster: "./assets/doraemon.jpg", rating: "T13" },
  { id: 9, name: "Bí Kíp Luyện Rồng", poster: "./assets/bi-kip-luyen-rong.jpg", rating: "T16" }
];

const schedules = {
  hcm: [
    { date: '2025-05-16', times: ['9:30', '11:30', '13:30', '15:30'], raps: ['Galaxy Nguyễn Du', 'CGV Vincom'] },
    { date: '2025-05-17', times: ['10:00', '12:00', '14:00', '16:00'], raps: ['Galaxy Nguyễn Du'] },
  ],
  hanoi: [
    { date: '2025-05-16', times: ['10:30', '13:30', '16:30'], raps: ['Lotte Hà Nội'] },
  ],
  danang: [
    { date: '2025-05-16', times: ['11:00', '14:00'], raps: ['CGV Đà Nẵng'] },
  ]
};

const chatbotResponses = [
  { keywords: ['phim', 'đang chiếu'], response: () => `Hiện tại có các phim: ${movies.map(m => m.name).join(', ')}. Xem chi tiết tại <a href="phim.html">đây</a>.` },
  { keywords: ['phim sắp chiếu'], response: () => `Phim sắp chiếu: ${upcomingMovies.map(m => m.name).join(', ')}. Xem chi tiết tại <a href="upcoming.html">đây</a>.` },
  { keywords: ['lịch chiếu', 'suất chiếu'], response: (city = 'hcm') => {
    const today = schedules[city]?.find(s => s.date === '2025-05-16');
    return today ? `Hôm nay (${today.date}) tại ${city.toUpperCase()}: ${today.raps.join(', ')} có các suất: ${today.times.join(', ')}.` : `Chưa có lịch chiếu tại ${city.toUpperCase()}.`;
  }},
  { keywords: ['ưu đãi', 'khuyến mãi'], response: () => `Ưu đãi hiện tại: Mua 2 vé tặng 1 nước miễn phí! Xem chi tiết tại <a href="news-offers.html">đây</a>.` },
  { keywords: ['đặt vé', 'mua vé'], response: () => `Bạn có thể đặt vé tại trang <a href="phim.html">Phim</a>, chọn phim và suất chiếu, sau đó nhấn "Đặt vé".` },
  { keywords: ['chào', 'hi'], response: () => `Chào bạn! Mình là P&D Cinema Bot, sẵn sàng giúp bạn! Hỏi về phim, lịch chiếu, hay ưu đãi nhé!` },
];

function setupSearch(inputId, suggestionId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const suggestions = [...movies, ...upcomingMovies].filter(m => m.name.toLowerCase().includes(query));
      const suggestionBox = document.querySelector(suggestionId);
      suggestionBox.innerHTML = suggestions.map(m => `<a href="phimDetail.html?id=${m.id}">${m.name}</a>`).join('');
    });
  }
}

function loadMovies() {
  const movieGrid = document.getElementById('movieGrid');
  if (movieGrid) {
    movieGrid.innerHTML = movies.map(m => `
      <div class="movie-card">
        <img src="${m.poster}" alt="${m.name}" loading="lazy">
        <h3>${m.name}</h3>
      </div>
    `).join('');
  }
}

function loadUpcomingMovies() {
  const upcomingMovieGrid = document.getElementById('upcomingMovieGrid');
  if (upcomingMovieGrid) {
    upcomingMovieGrid.innerHTML = upcomingMovies.map(m => `
      <div class="movie-card">
        <img src="${m.poster}" alt="${m.name}" loading="lazy">
        <h3>${m.name} (${m.rating})</h3>
      </div>
    `).join('');
  }
}

if (window.location.pathname.includes('phimDetail.html')) {
  const id = new URLSearchParams(window.location.search).get('id');
  const allMovies = [...movies, ...upcomingMovies];
  const movie = allMovies.find(p => p.id == id);
  const container = document.getElementById('movieDetail');
  if (movie) {
    document.getElementById('moviePoster').src = movie.poster;
    document.getElementById('movieName').textContent = movie.name;
    document.getElementById('moviePrice').textContent = movie.price || 'Chưa có giá';
    document.getElementById('movieDescription').textContent = movie.description || 'Chưa có thông tin';
    document.getElementById('movieRating').textContent = movie.rating;
    document.getElementById('movieTrailer').src = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Thay bằng trailer thật
  } else {
    container.innerHTML = '<p>Không tìm thấy phim!</p><a href="index.html">← Quay lại</a>';
  }
}

function loadSchedule() {
  const city = document.getElementById('citySelect')?.value;
  const dayTabs = document.getElementById('dayTabs');
  const scheduleList = document.getElementById('scheduleList');
  if (!city || !dayTabs || !scheduleList) return;

  const citySchedules = schedules[city] || [];
  dayTabs.innerHTML = citySchedules.map(s => `
    <div class="box-day ${s.date === '2025-05-16' ? 'active' : ''}" onclick="showSchedule('${s.date}')">
      <p>${s.date}</p>
    </div>
  `).join('');

  showSchedule(citySchedules[0]?.date);
}

function showSchedule(date) {
  const city = document.getElementById('citySelect')?.value;
  const scheduleList = document.getElementById('scheduleList');
  if (!city || !scheduleList) return;

  const schedule = schedules[city].find(s => s.date === date);
  scheduleList.innerHTML = schedule ? schedule.raps.map(rap => `
    <div class="rapPhim">
      <h4>${rap}</h4>
      <div class="type-time">
        <div class="type">2D Phụ đề</div>
        <div class="time">
          ${schedule.times.map(time => `<div class="box-time available">${time}</div>`).join('')}
        </div>
      </div>
    </div>
  `).join('') : '<p>Chưa có lịch chiếu</p>';
}

function postComment() {
  const commentInput = document.getElementById('commentInput');
  const commentList = document.getElementById('commentList');
  if (!commentInput || !commentList) return;

  const comment = commentInput.value.trim();
  if (comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.textContent = comment;
    commentList.appendChild(commentElement);
    commentInput.value = '';
    localStorage.setItem('comments', commentList.innerHTML);
  }
}

function bookTicket() {
  alert('Chuyển hướng đến trang chọn ghế (chưa triển khai)');
}

function validateLoginForm() {
  const email = document.querySelector('.auth-form input[type="email"]')?.value;
  const password = document.querySelector('.auth-form input[type="password"]')?.value;
  if (!email?.includes('@') || password?.length < 6) {
    document.querySelector('.auth-form').classList.add('error');
    return false;
  }
  document.querySelector('.auth-form').classList.remove('error');
  alert('Đăng nhập thành công (giả lập)');
  return true;
}

function shareToX(title) {
  window.open(`https://x.com/share?url=${window.location.href}&text=Xem ${title} tại P&D Cinema!`);
}

function sendChatbotMessage() {
  const input = document.getElementById('chatbotInput');
  const messages = document.getElementById('chatbotMessages');
  if (!input || !messages) return;

  const query = input.value.trim().toLowerCase();
  if (!query) return;

  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.textContent = query;
  messages.appendChild(userMessage);

  let response = 'Vui lòng thử lại hoặc liên hệ hỗ trợ!';
  for (const res of chatbotResponses) {
    if (res.keywords.some(keyword => query.includes(keyword))) {
      response = typeof res.response === 'function' ? res.response(query.includes('hà nội') ? 'hanoi' : query.includes('đà nẵng') ? 'danang' : 'hcm') : res.response;
      break;
    }
  }

  const botMessage = document.createElement('div');
  botMessage.className = 'bot-message';
  botMessage.innerHTML = response;
  messages.appendChild(botMessage);

  messages.scrollTop = messages.scrollHeight;
  localStorage.setItem('chatbotHistory', messages.innerHTML);
  input.value = '';
}

function setupChatbot() {
  const toggle = document.querySelector('.chatbot-toggle');
  const window = document.querySelector('.chatbot-window');
  const close = document.querySelector('.chatbot-close');
  if (toggle && window && close) {
    toggle.addEventListener('click', () => {
      window.style.display = window.style.display === 'none' ? 'flex' : 'none';
    });
    close.addEventListener('click', () => {
      window.style.display = 'none';
    });
    const history = localStorage.getItem('chatbotHistory');
    if (history) {
      document.getElementById('chatbotMessages').innerHTML = history;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch('movieSearch', '.header-bot-right .search-suggestions');
  setupSearch('movieSearchSection', '.movies .search-suggestions');
  loadMovies();
  loadUpcomingMovies();
  if (window.location.pathname.includes('phimDetail.html')) {
    loadSchedule();
    document.getElementById('commentList').innerHTML = localStorage.getItem('comments') || '';
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  document.querySelector('.dark-mode-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  setupChatbot();
});
