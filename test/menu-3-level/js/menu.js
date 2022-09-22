// НОРМАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ МЕНЮ - не корректно отрабатывает при ресайзе
// взять код для ресайза из menu.js и пофиксить

// ++++++++++++++++++++++++++
function setActiveMenuItem() {
  const menuItems = document.querySelectorAll(".top-nav .menu-item");
  const mark = document.querySelector(".current-page-mark");

  for (let menuItem of menuItems) {
    console.log(menuItem);
    if (
      menuItem.querySelector("a.menu-item-lbel").innerText === mark.dataset.page
    ) {
      menuItem.classList.add("active");

      return;
    }
  }
}

setActiveMenuItem();
// ++++++++++++++++++++++++++

/*TOP - NAV SETTINGS*/
let windowWidth;
let menuPositionX = 0;

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".top-nav");
const menuOverl = document.querySelector(".top-nav-overl");
const navBarBreakPoint = 768;

document.addEventListener("DOMContentLoaded", () => {
  initNavBar(menu);
  navBarHandle(menuToggle, menu, menuOverl);
});

window.onresize = function () {
  initNavBar(menu);
};

function initNavBar(menu) {
  windowWidth = document.documentElement.clientWidth;

  let menuInner = menu.querySelector(".menu");
  let menuLevel = 1;

  function setMenuControls(menu, enableScrollSubmenu, menuLevel) {
    let parentMenuItems;
    if (enableScrollSubmenu === false) {
      parentMenuItems = Array.from(menu.childNodes).filter(
        (item) =>
          item.nodeType == 1 &&
          item.classList.contains("menu-item-has-children")
      );
      // console.log("parentMenuItems: ", parentMenuItems);
    } else if (enableScrollSubmenu === true) {
      parentMenuItems = Array.from(
        menu.querySelector(".enable-scroll-submenu").childNodes
      ).filter(
        (item) =>
          item.nodeType == 1 &&
          item.classList.contains("menu-item-has-children")
      );
      // console.log("ARRAY-childNodes:", parentMenuItems);
      // return;
    }

    if (parentMenuItems.length > 0) {
      menuLevel++;
      // console.log(parentMenuItems);
      for (let parentMenuItem of parentMenuItems) {
        let menuItemLbel = parentMenuItem.querySelector(".menu-item-lbel");
        // console.log(menuItemLbel);
        let subMenu = parentMenuItem.querySelector(".sub-menu");
        subMenu.setAttribute("data-level", menuLevel);

        if (parentMenuItem.querySelector(".item__angle") === null) {
          let itemAngle = document.createElement("div");
          itemAngle.className = "menu-item__angle item__angle";
          menuItemLbel.append(itemAngle);
          // console.log(menuItemLbel);
        }

        if (subMenu.querySelector(".back-btn") === null) {
          let backBtn = document.createElement("li");
          backBtn.className = "menu-item back-btn";
          backBtn.innerHTML =
            '<div class="back-btn__arrow"></div><span>Назад</span>';
          subMenu.querySelector(".enable-scroll-submenu").prepend(backBtn);
        }

        function correctSubMenuPosition(subMenu) {
          let coords = subMenu.getBoundingClientRect();
          let subMenuRight = coords.right;
          let subMenusOffsetRight = windowWidth - subMenuRight;
          if (windowWidth >= navBarBreakPoint) {
            if (subMenusOffsetRight < 0) {
              if (menuLevel == 2) {
                subMenu.style.left = "auto";
                subMenu.style.right = "0";
              } else if (menuLevel == 3) {
                subMenu.style.left = "auto";
                subMenu.style.right = "100%";
              }
            }
          } else if (windowWidth < navBarBreakPoint) {
            subMenu.style = "";
          }
        }

        correctSubMenuPosition(subMenu);

        if (subMenu.querySelector(".menu-item-has-children")) {
          setMenuControls(subMenu, true, menuLevel);
        }
      }
    }
  }

  setMenuControls(menuInner, false, menuLevel);

  changeMenuLevel();

  function changeMenuLevel() {
    for (let menuItemHasChildren of menuInner.querySelectorAll(
      ".menu-item-has-children"
    )) {
      let subMenu = menuItemHasChildren.querySelector(".sub-menu");
      let backBtn = subMenu.querySelector(".back-btn");
      let itemAngle = menuItemHasChildren.querySelector(
        ".menu-item-lbel > .menu-item__angle"
      );

      let levelDown = function () {
        subMenu.classList.add("current");
        menuPositionX -= 100;
        menuInner.style.transform = `translateX(${menuPositionX}%)`;
      };
      let levelUp = function () {
        menuPositionX += 100;
        menuInner.style.transform = `translateX(${menuPositionX}%)`;
        subMenu.classList.remove("current");
      };

      if (windowWidth < navBarBreakPoint) {
        itemAngle.onclick = levelDown;
        backBtn.onclick = levelUp;
      }
      if (windowWidth >= navBarBreakPoint) {
        itemAngle.onclick = "";
        backBtn.onclick = "";
        menuPositionX = 0;
        menuInner.style.transform = ``;
      }
    }
  }
}

// Открытие-закрытие мобильного навбара
function navBarHandle(menuToggle, menu, menuOverl) {
  const items = menu.querySelectorAll(".menu > .menu-item");

  let isDelay;

  function menuItemsAddDelay(menu) {
    let delay = 0.2;
    for (let item of items) {
      delay += 0.06;
      item.style.transitionDelay = `${delay}s`;
    }
    isDelay = true;
  }

  function menuItemsRemoveDelay(menu) {
    for (let item of items) {
      item.style.transitionDelay = ``;
    }
    isDelay = false;
  }

  menuToggle.addEventListener("click", function () {
    isDelay ? menuItemsRemoveDelay(menu) : menuItemsAddDelay(menu);
    menuToggle.classList.toggle("open");
    menu.classList.toggle("open");
    document.body.classList.toggle("scroll-hidden");
    menuOverl.classList.toggle("open");
  });

  menuOverl.addEventListener("click", menuClose);

  function menuClose() {
    menuItemsRemoveDelay(menu);
    menuToggle.classList.remove("open");
    menu.classList.remove("open");
    document.body.classList.remove("scroll-hidden");
    menuOverl.classList.remove("open");
  }
}
// - - - - - - - - - -
/*END of TOP - NAV SETTINGS*/
