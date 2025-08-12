// レスポンシブ対応　keyvisualセクションの高さを可変にする
$(function(){
  // カレー画像の高さを取得して、変数curryImageに代入
  const curryImage = $('.curry-img').height();
  // 画面幅が767pxより大きい場合
  if ($(window).width() > 767) {
    // keyvisualセクションにカレー画像の高さを代入
    $('.keyvisual').css('height',curryImage+'px');
  } else {
    // keyvisualセクションにカレー画像の高さ+320pxを代入
    $('.keyvisual').css('height',curryImage+320+'px');
  }
});

$(function(){
  // particular-contentsの高さを取得して、変数particularHeightに代入
  const particularHeight = $('.particular-contents').height();
  // 画面幅が767pxより小さい場合
  if ($(window).width() < 767) {
    // noilly-particularセクションに代入
    $('.noilly-particular').css('height',particularHeight +'px');
  }
});

$(function () {
  // 固定ヘッダー要素をjQueryオブジェクトとして取得
  const $fixed = $("#js-header");
  // ウィンドウのスクロールイベントを監視
  $(window).scroll(function () {
    // スクロール位置が250pxを超えたら
    if ($(this).scrollTop() > 250) {
      // 固定ヘッダーにis-showクラスを追加して表示
      $fixed.addClass("is-show");
    } else {
      // スクロール位置が200px以下ならis-showクラスを削除して非表示
      $fixed.removeClass("is-show");
    }
  });
});

$(function () {
  // 上部のメニューボタンをクリックしたときに実行する処理
  $("#drawer_button").click(function () {
    // ボタンのclass属性を切り替え
    $("#drawer_button").toggleClass("active");
    $("#js-header-button").toggleClass("active");
    // 非表示メニューのclass属性を切り替え
    $(".drawer_nav_wrapper").toggleClass("open");
  });
});

$(function () {
  // スクロールで出てくるメニューボタンをクリックしたときに実行する処理
  $("#js-header-button").click(function () {
    // ボタンのclass属性を切り替え
    $("#drawer_button").toggleClass("active");
    $("#js-header-button").toggleClass("active");
    // 非表示メニューのclass属性を切り替え
    $(".drawer_nav_wrapper").toggleClass("open");
  });
});

$(function () {
  // page-topボタンをクリックしたときに実行する処理
  $(".page-top").click(function () {
    /// ページトップへ移動する
    $('html,body').animate({
    scrollTop: 0
    });
  });
});

$(function () {
  // viewボタンにマウスをかざした時に実行する処理
  $(".view-btn").mouseover(function () {
    // ボタン内の文字色を白に変更
    $(this).find(".view-btn-text").css("color","#ffffff");
  });
});

$(function () {
  // viewボタンからマウスを離した時に実行する処理
  $(".view-btn").mouseout(function () {
    // ボタン内の文字色を白に変更
    $(this).find(".view-btn-text").css("color","#333333");
  });
});

$(function () {
  // cartボタンにマウスをかざした時に実行する処理
  $(".cart-btn").mouseover(function () {
    // ボタン内の文字色を緑に変更
    $(this).find(".cart-btn-text").css("color","#ffffff");
  });
});

$(function () {
  // cartボタンからマウスを離した時に実行する処理
  $(".cart-btn").mouseout(function () {
    // ボタン内の文字色を緑に変更
    $(this).find(".cart-btn-text").css("color","#128E6F");
  });
});

// Swiperの設定
let SwiperSlider = null;

/* Swiperを作成する関数 */
function initSwiper() {
  if( SwiperSlider === null ) {
    const SwiperSlider = new Swiper('.swiper2', {
      loop: true,
      speed: 300,
      // 自動再生の設定
      autoplay: {
        // 3秒ごとに切り替え（3000ミリ秒）
        delay: 3000,
        // ユーザー操作後も自動再生を継続
        disableOnInteraction: false,
      },
      // 最後のスライドに到達したら最初に戻る設定
      rewind: true,
      // ページネーション（円形プログレスバー付き）の設定
      pagination: {
        el: '.swiper-pagination',
        // クリックで切り替え可能
        clickable: true,
        renderBullet: function (index, className) {
          // SVG円形プログレスバー付きの数字ボタン
          return '<span class="' + className + '" tabindex="0">' +
            '<svg viewBox="0 0 60 60" class="pagination-circle">' +
            '<circle cx="30" cy="30" r="29" stroke="#ccc" stroke-width="2" fill="none" class="circle-bg"></circle>' +
            '<circle cx="30" cy="30" r="29" stroke="#128E6F" stroke-width="2" fill="none" class="circle-progress"></circle>' +
            '</svg>' +
            '<span class="circle_inner">' + (index + 1) + '</span>' +
            '</span>';
        },
      },
      // スライドが切り替わった時の処理
      on: {
        slideChange: function() {
          // 現在のスライド番号を取得
          updateImages(this.realIndex);
        },
        // SVGアニメーションをリセット
        slideChangeTransitionStart: function() {
          // 進行する円のアニメーションをリセット
          const progressCircles = document.querySelectorAll('.pagination-circle .circle-progress');
          progressCircles.forEach(circle => {
            circle.style.animation = 'none';
            // リフローを強制してアニメーションをリセット
            void circle.offsetHeight;
            circle.style.animation = '';
          });
        }
      }
    })
  }
};

// テキストが切り替わったら画像も切り替える処理
function updateImages(activeIndex) {
  // すべての画像を取得
  const figures = document.querySelectorAll('.main-slider figure');
  // すべての画像から「is-active」クラスを削除
  figures.forEach((figure, index) => {
    figure.classList.remove('is-active');
    // 対応する画像に「is-active」クラスを追加
    if (index === activeIndex) {
      figure.classList.add('is-active');
    }
  });
};

/* Swiperを解除する関数 */
function destroySwiper() {
    if( SwiperSlider !== null ){
        SwiperSlider.destroy(false, true);
        SwiperSlider = null;
    }
}

/* 【読み込み時と画面リサイズ時】
画面サイズが768px以上でSwiperを作成
767px以下の場合はSwiperを解除する */
$(window).on('load resize',function(){
    if( $(window).width() >= 768 ){
        initSwiper();
    }
    else{
        destroySwiper();
    }
});

// 表示領域に入ったらclass付与
$(function () {
  $('.inview').on("inview", function () {
    $(this).addClass('show');
  });
});