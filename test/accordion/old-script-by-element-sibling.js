"use strict";


const collapse = document.getElementById("collapse"),
	collapseBtns = document.querySelectorAll(".collapse-btn"),
	collapseContents = document.querySelectorAll(".collapse-content");

for (let i = 0; i < collapseBtns.length; i++) {
	let collapseBtn = collapseBtns[i];
	collapseBtn.addEventListener("click", () => {
		if (collapseBtn.nextElementSibling.style.maxHeight) {
			closeCollapses();
		} else {
			closeCollapses();
			openCollapse(collapseBtn);
		}
	});
}

function closeCollapses(collapseBtn) {
	for (let i = 0; i < collapseContents.length; i++) {
		collapseContents[i].style.maxHeight = "";
		collapseContents[i].previousElementSibling.classList.remove("open");
	}
}

function openCollapse(collapseBtn) {
	if (!collapseBtn.nextElementSibling.style.maxHeight) {
		collapseBtn.nextElementSibling.style.maxHeight =
			collapseBtn.nextElementSibling.scrollHeight + "px";
		collapseBtn.classList.add("open");
	} else {
		collapseBtn.nextElementSibling.style.maxHeight = "";
		collapseBtn.classList.remove("open");
	}
}