var basicUnits = 30;
var eachUnit = 10;
var normalWin;
var selectedBanker; // 保存選中的莊家
var extraUnits;
var playerAmounts = {};

function toggleContent() {
  var selfDrawnWinValue = document.querySelector('input[name="selfDrawnWin"]:checked').value;
  var whoBanker = document.getElementById('whoBanker');
  var bankerArea = document.getElementById('bankerArea');
  var paymentDropdown = document.getElementById('paymentDropdown');

  // 將 console.log 移至取得值之後
  var selfDrawnWinner = document.getElementById('winner').value; // 取得自摸贏家的值
  var banker = document.getElementById('banker').value; // 取得莊家的值

  console.log("selfDrawnWinner:", selfDrawnWinner);
  console.log("banker:", banker);
  
  if (selfDrawnWinValue === 'yes') {
    whoBanker.classList.remove('hidden');
    
    if (selfDrawnWinner === banker) { // 檢查自摸贏家是否與莊家相同
      bankerArea.classList.add('hidden');
    } else {
      bankerArea.classList.remove('hidden');
    }

    paymentDropdown.classList.add('hidden');
  } else {
    whoBanker.classList.add('hidden');
    bankerArea.classList.add('hidden');
    paymentDropdown.classList.remove('hidden');
  }
}

function updateBanker() {
  var bankerSelect = document.getElementById('banker');
  selectedBanker = bankerSelect.value;
  // 在這裡你可以進行相應的處理，比如打印到控制台
  console.log('Selected Banker:', selectedBanker);
}

function calculateMoney() {
  var wonUnitElement = document.getElementById('wonUnit');
  var wonUnit = wonUnitElement ? parseInt(wonUnitElement.value) : 0;
  console.log('wonUnit:', wonUnit); // 添加這一行

  var continueBankerElement = document.getElementById('continueBanker');
  var continueBanker = continueBankerElement ? parseInt(continueBankerElement.value) : 0;
  var selfDrawnWin = document.querySelector('input[name="selfDrawnWin"]:checked').value;
    
  var normalWin = basicUnits + (eachUnit * wonUnit);
  var extraUnits = calculateExtraUnits(continueBanker);
  console.log('normalWin:', normalWin); // 添加這一行
  console.log('extraUnits:', extraUnits); // 添加這一行

  var amounts = calculatePlayerAmounts(wonUnit, normalWin, continueBanker, selfDrawnWin, extraUnits);
  console.log('amounts', amounts);

  updateAmounts(amounts);

}

function calculateExtraUnits(continueBanker) {
  var minExtraUnitsPerContinue = 1;
  var ExtraUnitsPerContinue = 2;
  var extraUnits = (minExtraUnitsPerContinue + ExtraUnitsPerContinue * continueBanker) * eachUnit + basicUnits  ;
  return extraUnits;
}

  function calculatePlayerAmounts(wonUnit, normalWin, continueBanker, selfDrawnWin, extraUnits,) {
    var amounts = {
        'player1': 0,
        'player2': 0,
        'player3': 0,
        'player4': 0,
    };
    
    console.log('Self Drawn Win:', wonUnit, normalWin, continueBanker, selfDrawnWin, extraUnits,);


    var winnerSelect = document.getElementById('winner');
    var selectedPlayer = winnerSelect.value;
    var loserSelect = document.getElementById('loser');
    var loserSelect = loserSelect.value;

    if (selfDrawnWin === 'yes') {
      // 莊家自摸
      if (selectedPlayer === selectedBanker) {
        amounts[selectedBanker] = normalWin * 3 ;
    
        // 扣其他玩家
        for (var player in amounts) {
            if (player !== selectedBanker) {
                amounts[player] -= normalWin; 
            }
        }

    } else {
        amounts[selectedPlayer] = normalWin*2 + extraUnits + (eachUnit * wonUnit);
        amounts[selectedBanker] = -(extraUnits + eachUnit * wonUnit);
        for (var player in amounts) {
          if (player !== selectedPlayer && player !== selectedBanker) {
              amounts[player] = -normalWin; 
          }
      }
}
    } else {
        amounts[selectedPlayer] = normalWin;
        amounts[loserSelect] = - normalWin;

    }

    console.log('Final Amounts:', amounts);
    return amounts;
  
}

function updateAmounts(amounts) {
  var playerAmountsElement = document.getElementById('playerAmounts');
  
  for (var player in amounts){
    var amount = amounts[player];
    var playerId = player.replace(/\D/g, ''); // 將 player 變數中的非數字字符去除，只保留數字部分。

    if (playerAmounts[playerId] === undefined) {
      playerAmounts[playerId] = 0; // 如果玩家的累積金額未定義，則將其初始化為0。
    }
    
    playerAmounts[playerId] += amount; // 將當前的金額加到玩家的累積金額中。

    var playerParagraph = document.getElementById('player' + playerId);

    if (playerParagraph) {
      playerParagraph.textContent = player + ':' + playerAmounts[playerId] + '元'; // 更新玩家的累積金額。
    }
  }
}

