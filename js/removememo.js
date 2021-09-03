window.onload = function() {
	console.log('메모삭제확장로드'+ window.location.href);
	if(memolist().length != 0){
		var 애비요소 = document.getElementsByClassName('article-memo')[0];
		var 새버튼붙일곳 = document.createElement('div');
		var 전체삭제버튼 = document.createElement('a');
		전체삭제버튼.appendChild(document.createTextNode('전체삭제'));
		새버튼붙일곳.className = 'post_btns';
		전체삭제버튼.className = 'btn_type1 nmr_removeall';
        전체삭제버튼.style.cursor = 'pointer';
		새버튼붙일곳.appendChild(전체삭제버튼);
		애비요소.appendChild(새버튼붙일곳);
		전체삭제버튼.onclick = function(){ removememo(); };
	}
}

function memolist(){
	var link = Array.from(document.getElementsByClassName('link_del'));
	list = [];
	link.forEach((value) => {
		var num = value+' ';
		num = num.split("(");
		num = num[1].split(")");
		list.push(num[0]);
	});
	return(list);
}

function removememo(){
	if(confirm("삭제하시겠습니까?")){
		console.log(list);
		var i = 0;
		var getp = new URL(window.location.href);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://cafe.naver.com/MemoDelete.nhn?clubid="+ getp.searchParams.get("search.clubid") +"&menuid="+ getp.searchParams.get("search.menuid") +"&articleid="+ list[i] +"&page=1", true);
		xhr.onreadystatechange = function(){
		    if(xhr.readyState == 4){
                i = i + 1;
                if(list[i] != undefined){
                    xhr.open("GET", "https://cafe.naver.com/MemoDelete.nhn?clubid="+ getp.searchParams.get("search.clubid") +"&menuid="+ getp.searchParams.get("search.menuid") +"&articleid="+ list[i] +"&page=1", true);
                    xhr.send();
                }
                else
                    window.location.reload();
			}
		}
		xhr.send();
	}
}