var list = [];

let observer = new MutationObserver(() => {
	console.log('변경감지');
	if(memolist() == 0)
		window.location.reload();
	gendom();
});
observer.observe(document.getElementById('articleList'), {childList: true});

window.onload = function(){
	console.log('간편삭제확장로드'+ window.location.pathname);
	if(memolist() != 0){
		//전체선택 버튼 심기
		if(document.getElementById('more_div') == null){
			var 밑에줄 = document.createElement('div');
			밑에줄.className = 'simple_paginate';
			밑에줄.id = 'more_div';
			document.getElementsByClassName('article-simple')[0].appendChild(밑에줄);
		}
		else{
			var 밑에줄이있었다 = 1;
			var 밑에줄 = document.getElementById('more_div');
		}
		var 전체선택버튼 = document.createElement('div');
		전체선택버튼.className = 'check_box';
		var 버튼안에인풋 = document.createElement('input');
		버튼안에인풋.type = 'checkbox';
		버튼안에인풋.id = 'selectAll';
		버튼안에인풋.name = 'selectall';
		var 버튼안에라벨 = document.createElement('label');
		버튼안에라벨.htmlFor = 'selectAll';
		버튼안에라벨.appendChild(document.createTextNode('전체선택'));
		버튼안에라벨.style.cursor = 'pointer';
		버튼안에라벨.style.userSelect = 'none';
		전체선택버튼.appendChild(버튼안에인풋);
		전체선택버튼.appendChild(버튼안에라벨);
		전체선택버튼.style.position = 'relative';
		전체선택버튼.style.top = '16px';
		전체선택버튼.style.left = '700px';
		밑에줄.appendChild(전체선택버튼);
		if(밑에줄이있었다){
			전체선택버튼.style.top = '-32px';
			document.getElementsByClassName('top m-tcol-c')[0].style.marginRight = '160px';
		}
		document.querySelector("input[name=selectall]").addEventListener("change", function(){
			var cklist = document.querySelectorAll("input[name=article_chk]");
			for(var i = 0; i < cklist.length; i++){
				cklist[i].checked = this.checked;
			}
		});
		//선택삭제 버튼 심기
		var 새버튼붙일곳 = document.createElement('div');
		var 삭제버튼 = document.createElement('a');
		삭제버튼.appendChild(document.createTextNode('삭제'));
		새버튼붙일곳.className = 'post_btns';
		삭제버튼.className = 'btn_type1 nmr_removeall';
		삭제버튼.style.cursor = 'pointer';
		삭제버튼.style.backgroundColor = 'white';
		삭제버튼.style.fontSize = '13px';
		삭제버튼.style.position = 'relative';
		if(밑에줄이있었다)
			삭제버튼.style.top = '-59px';
		else
			삭제버튼.style.top = '-10px';
		삭제버튼.style.left = '788px';
		삭제버튼.style.width = '20px';
		밑에줄.appendChild(삭제버튼);
		삭제버튼.onclick = function(){ removememo(); };

		gendom();
	}
};

function gendom(){
	if(window.location.pathname == '/SimpleArticleList.nhn'){
		//게시글 선택 버튼
		var 글하나하나 = document.getElementsByClassName('list-blog');
		for(var i = 0; i < 글하나하나.length; i++){
			if(list.includes(글하나하나[i].id) == false){
				var 선택버튼 = document.createElement('div');
				선택버튼.className = 'check_box only_box';
				선택버튼.style.position = 'relative';
				선택버튼.style.top = '-18px';
				선택버튼.style.width = '16px';
				선택버튼.style.left = (글하나하나[i].getElementsByClassName('fr act')[0].offsetWidth +7)+'px';
				var 버튼안에인풋 = document.createElement('input');
				버튼안에인풋.type = 'checkbox';
				버튼안에인풋.name = 'article_chk';
				버튼안에인풋.id = 'article_chk'+ 글하나하나[i].id;
				버튼안에인풋.value = 글하나하나[i].id;
				버튼안에인풋.style.display = 'none';
				var 버튼안에라벨 = document.createElement('label');
				버튼안에라벨.htmlFor = 'article_chk'+ 글하나하나[i].id;
				버튼안에라벨.value = 글하나하나[i].id;
				버튼안에라벨.style.cursor = 'pointer';
				선택버튼.appendChild(버튼안에인풋);
				선택버튼.appendChild(버튼안에라벨);
				글하나하나[i].getElementsByClassName('fr act')[0].getElementsByClassName('act_btns')[0].appendChild(선택버튼);
				글하나하나[i].getElementsByClassName('fr act')[0].style.paddingRight = '23px';
				list.push(글하나하나[i].id);
			}
		}
		console.log(list);
	}
}

function memolist(){
	var link = Array.from(document.getElementsByClassName('m-tcol-c _rosRestrict'));
	console.log(link.length);
	return(link.length);
}

function removememo(){
	console.log("버튼눌림");
	var list = [];
	var cklist = document.querySelectorAll("input[name=article_chk]");
	if(cklist.length == 0)
		alert("선택된 글이 없습니다.");
	else{
		if(confirm("삭제하시겠습니까?")){
			for(var i = 0; i < cklist.length; i++){
				if(cklist[i].checked)
					list.push(cklist[i].value);
			}
			console.log(list);
			var i = 0;
			var getp = new URL(window.location.href);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://cafe.naver.com/SimpleArticleDeleteAjax.nhn", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					console.log(xhr.response);
					i = i + 1;
					if(list[i] != undefined){
						xhr.open("POST", "https://cafe.naver.com/SimpleArticleDeleteAjax.nhn", true);
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
						xhr.send('clubid='+ getp.searchParams.get("search.clubid") +'&articleid='+ list[i]);
					}
					else
						window.location.reload();
				}
			}
			xhr.send('clubid='+ getp.searchParams.get("search.clubid") +'&articleid='+ list[i]);
		}
	}
}