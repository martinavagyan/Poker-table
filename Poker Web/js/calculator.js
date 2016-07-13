/**
	Author: Martin Avagyan
*/

var cards ={
	cardsAll: function(){
		var a ={'c':['2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC'],
				'd':['2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD'],
				'h':['2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH'],
				's':['2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS']};
		return a;
		},
	
	cardValue: function(){			
		var a ={'2C':1,'3C':2,'4C':3,'5C':4,'6C':5,'7C':6,'8C':7,'9C':8,'10C':9,'JC':10,'QC':11,'KC':12,'AC':13,
				'2D':1,'3D':2,'4D':3,'5D':4,'6D':5,'7D':6,'8D':7,'9D':8,'10D':9,'JD':10,'QD':11,'KD':12,'AD':13,
				'2H':1,'3H':2,'4H':3,'5H':4,'6H':5,'7H':6,'8H':7,'9H':8,'10H':9,'JH':10,'QH':11,'KH':12,'AH':13,
				'2S':1,'3S':2,'4S':3,'5S':4,'6S':5,'7S':6,'8S':7,'9S':8,'10S':9,'JS':10,'QS':11,'KS':12,'AS':13};
		return a;
		},				
	cardOnTable: function(){
		var remain = [];
		remain['c'] = arr_diff(cards.cardsAll['c'], Check.cards['c']);
		remain['d'] = arr_diff(cards.cardsAll['d'], Check.cards['d']);
		remain['h'] = arr_diff(cards.cardsAll['h'], Check.cards['h']);
		remain['s'] = arr_diff(cards.cardsAll['s'], Check.cards['s']);
		return remain;
	},
	tableCards: function(){
		var arrayTable = [];
		var n = 1;
		for(var i =1;i<7;i++){
			arrayTable['table'+i] = [document.getElementById('card'+n).children[0].id,document.getElementById('card'+(n+1)).children[0].id];			
			n = n+2;
		}
		console.log(arrayTable);
		return arrayTable;
	},
};
function highCard()
{	
	/*{'table1':['4D','9S'],'table2':['5D','KS'],'table3':['2D','JS'],
				 'table4':['JD','JC'],'table5':['AC','5S'],'table6':['AD','AS'],				 
				};*/
	var cardsInTable = cards.tableCards();	
	var index1 = undefined;
	var index2 = undefined;
	var values = cards.cardValue();
	
	
	for(var i = 1;i<7;i++)
	{
		index1 = cardsInTable['table'+i][0];
		index2 = cardsInTable['table'+i][1];
		
		if(values[index1] > values[index2])
			cardsInTable['table'+i] =values[index1];
		else cardsInTable['table'+i] =values[index2];			
	}
	var returnArray = [];
	var sortedArray = [];
	for(z in cardsInTable){	
		returnArray.push(cardsInTable[z]);
	}
	for(z in cardsInTable){	
		sortedArray.push(cardsInTable[z]);
	}	
	
	sortedArray.sort(function(a, b){return b-a});
	
	console.log(sortedArray);	
	console.log(returnArray);
	
	var n = 6;
	var finalArray = [];
	for(var i = 0;i<sortedArray.length; i++)
	{				
		
		finalArray [returnArray.indexOf(sortedArray[i])] = n;
		returnArray[returnArray.indexOf(sortedArray[i])] = 0;
		//splice(2, 0, "Lene");
		if(sortedArray[i]!= sortedArray[i+1])
		n--;
	}	
	console.log(finalArray);
	return finalArray;
};

function onePair()
{
	var cardsInTable = {'table1':['4D','9S'],'table2':['5D','KS'],'table3':['2D','JS'],
						'table4':['JD','JC'],'table5':['AC','5S'],'table6':['AD','AS'],				 
						};
	var index1 = undefined;
	var index2 = undefined;
	var values = cards.cardValue();
	var havePairArray = [];
	var noPairArray = [];
	
	for(var i = 1;i<7;i++)
	{
		index1 = cardsInTable['table'+i][0];
		index2 = cardsInTable['table'+i][1];
		
		if(values[index1] == values[index2])
			havePairArray.push('table'+i);
		else noPairArray.push('table'+i);
	}
	//if one pare exists compare with others and find the highest, if does not exist chack the probability
	
	//highest from ones that have
	
	console.log(cardsInTable);
	console.log(havePairArray);
	console.log(noPairArray);
	
	
}

//diffence between array
function arr_diff(a1, a2)
{
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
};