/**
	Author: Martin Avagyan
*/

var Check ={
		GiveIdToTableCards: function(tableCardElem,cardId)
		{
			tableCardElem.setAttribute('id',cardId);
			var cardType = cardId.slice(-1);
			cardType = cardType.toLowerCase();
			
			var index = Check.cards[cardType].indexOf(cardId);
			if (index > -1)			
				Check.cards[cardType].splice(index, 1);			
		},
		classOfParent: '',
		findTableOfCard: function(inputElemen){
			if(hasClass(inputElemen.parentElement.parentElement,'headerCards') == true)
				Check.classOfParent = 'headerImg';
			else if(hasClass(inputElemen.parentElement.parentElement,'tableCards') == true)
				Check.classOfParent = 'footerImg';
		},
		activeSearchBox: undefined,		
		currentInput: '',
		name: "martin",
		cards: {'c':['2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC'],
				'd':['2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD'],
				'h':['2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH'],
				's':['2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS']},
		//enter function
		readyEnter: function(inputEl)
		{
			var InputValue = convertToArrayFormat(inputEl.value);
			if(isInArray(InputValue, Check.cards[inputEl.value.charAt(0) ]))
				return true;
			else return false;
		},
		pressEnter: function(e,inputElem){
			 if (e.keyCode == 13 && Check.readyEnter(inputElem) == true) {	
					//converting to desired format
					var searchedCardClass = convertToArrayFormat(inputElem.value);
					var parentElem = inputElem.parentElement.parentElement;
					var choosenCard = document.createElement('div');
					choosenCard.setAttribute('class',Check.classOfParent+" D"+searchedCardClass);
					Check.GiveIdToTableCards(choosenCard,searchedCardClass);
					choosenCard.innerHTML = '<span class="removeBtn" onclick="Check.closeChoosen(this)"></span>';
					parentElem.innerHTML = '';
					parentElem.appendChild(choosenCard);	
					
				}
			},			
		closeChoosen: function(closeBtn){
			Check.cards[closeBtn.parentElement.id.slice(-1).toLowerCase()].push(closeBtn.parentElement.id);//from the spcified array push the id of the removed card
			closeBtn.parentElement.parentElement.innerHTML = 
			'<div class="cardAdd"><input type="text" maxlength="2" placeholder="Choose" onkeypress="return Check.pressEnter(event,this)" onkeyup = "Check.chooseCard(this)"></input></div>';
			
		},
		
		//this is the engine for searchBox
		chooseCard: function(inputElem){
			Check.findTableOfCard(inputElem);
			if  (typeof Check.activeSearchBox != 'undefined')  Check.activeSearchBox.remove();//deleting previus searchbox.
			var srchedCrdTpe = inputElem.value;
			var searchContainer = document.createElement('div');
			searchContainer.setAttribute('id','searchContainer');			
			inputElem.parentElement.appendChild(searchContainer);	
			searchContainer = document.getElementById('searchContainer');
			Check.activeSearchBox = searchContainer; // getting current active search box.		
			//if the text is one charachered and is D C H S
			if(srchedCrdTpe.length == 0)
			{
				searchContainer.innerHTML = '';
			}
			else if(srchedCrdTpe.length == 1 && (srchedCrdTpe =='d' || srchedCrdTpe =='s' || srchedCrdTpe =='h' || srchedCrdTpe =='c'))	
			{
				searchContainer.innerHTML =
				"<div class='lifeSearchStyle'></div><div id = 'searchBox' class='liveSearch'></div>";
				for (var i = 0; i < Check.cards[srchedCrdTpe].length;i++)
				{	
					var searchBox = document.getElementById('searchBox');	
					var searchedCard = Check.cards[srchedCrdTpe][i];	
					var element = document.createElement('div');
					element.setAttribute('class','searchCards D'+searchedCard);
					element.setAttribute('id','SSC'+searchedCard);//giving the id to the small searched cards (ssc)
					element.onclick = function(e){
						var parentTable = element.parentElement.parentElement.parentElement.parentElement;
						var choosenCard = document.createElement('div');
						var SSCId = e.target.id.replace("SSC","");
						choosenCard.setAttribute('class',Check.classOfParent+' D'+SSCId);
						Check.GiveIdToTableCards(choosenCard,SSCId);
						choosenCard.innerHTML = '<span class="removeBtn" onclick="Check.closeChoosen(this)"></span>';
						parentTable.innerHTML = '';
						parentTable.appendChild(choosenCard);							
					};					
					searchBox.appendChild(element);
				}	
			}
			else if (srchedCrdTpe.length == 2 && Check.readyEnter(inputElem) == true)				
			{
				srchedCrdTpe = convertToArrayFormat(srchedCrdTpe);
				
				searchContainer.innerHTML = '';
				searchContainer.innerHTML = "<div class='lifeSearchStyle'></div><div id = 'searchBox' class='liveSearch liveSearchSecondString'></div>";				
				var searchBox = document.getElementById('searchBox');						
				var element = document.createElement('div');
				element.setAttribute('class','searchCards D'+srchedCrdTpe);
				element.setAttribute('id','SSC'+searchedCard);//giving the id to the small searched cards (ssc)
				element.onclick = function(e){
					var parentTable = element.parentElement.parentElement.parentElement.parentElement;
					var choosenCard = document.createElement('div');
					choosenCard.setAttribute('class',Check.classOfParent+' D'+srchedCrdTpe);
					Check.GiveIdToTableCards(choosenCard,srchedCrdTpe);
					choosenCard.innerHTML = '<span class="removeBtn" onclick="Check.closeChoosen(this)"></span>';
					parentTable.innerHTML = '';
					parentTable.appendChild(choosenCard);							
				};					
				searchBox.appendChild(element);
			}
			else
			{
				searchContainer.innerHTML = '';
			}
			
			
			
		},
	};



//Additional Functions 
//1 Reverse
function reverse(s){
    return s.split("").reverse().join("");
}
//end reverse
//has Class
function hasClass(element, className) {
    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
}
//end has class
//is in array
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
//end is in array
//format of array =cards
function convertToArrayFormat(inputElem)
{

	var searchedCardClass = inputElem.toUpperCase();
	return reverse(searchedCardClass);//end converting
}
//end
