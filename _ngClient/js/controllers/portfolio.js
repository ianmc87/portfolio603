//controller for portfolio model
angularnodeApp.controller('portfolioController', ['$scope', 'portfolioService',
  function($scope, portfolioService) {
    //portfolio Service GET used to get our stocks from our mlabs DB.
    //We then extract the array of stocks and assign it to the scope allStocks
    $scope.allStocks = portfolioService.get()
      .then(result => {
        $scope.allStocks = result; // extract the array of stocks
        console.log($scope.allStocks);
      })
      .catch(error => {
        $scope.allStocks = {}; // assume no data
      });

    //portfolio Service SET used to save our newly updated stocks to our mlabs DB.
    //We then set a message to appear via an alert in the HTML partial
    $scope.message = '';
    $scope.error = false;
    $scope.saveStocks = function() {
      //console.log('$scope.allStocks', $scope.allStocks);
      portfolioService.set($scope.allStocks)
        .then(result => {
          $scope.error = false;
          $scope.message = 'Portfolio has been updated';
        })
        .catch(error => {
          $scope.error = false;
          $scope.message = 'Portfolio did not update';
        });
    };

    //Calculate Quantity Total function
    $scope.calculateQtyTotal = function(stockData) {
      tempStock = stockData; // copy to tempStock so we can work on it
      var i;
      var qtyTotal = 0;
      for (i = 0; i < tempStock.held.length; i++) {
        // generate a value to go on each row for a stock entry
        tempStock.held[i].nowValue = (tempStock.held[i].number * tempStock.held[
          i].pps).toFixed(2);
        // generate a cumulative total
        qtyTotal = qtyTotal + tempStock.held[i].number; // for the total row
      }
      // store the total back on the object to access in the html
      return qtyTotal;
    }

     //Calculate value function
    $scope.calculateValue = function(data) {
      return (data.number * data.cpps);
    }

     //Calculate value total function
    $scope.calculateValueTotal = function(stockData) {
      tempStock = stockData; // copy to tempStock so we can work on it
      var i;
      var valTotal = 0;
      // Looping through specific stock (e.g. AIB) and caculating the total
      for (i = 0; i < tempStock.held.length; i++) {
        valTotal += $scope.calculateValue(tempStock.held[i]); // for the total row
      }
      // store the total back on the object to access in the html
      return valTotal;
    }

    //Calculate Gain/ Loss value function
    $scope.calculateGainLoss = function(data) {
      /** function body - complete calculation. The 'data' is our oneRecord value
      that we are passing from our portfolio.html partial from our DB*/
      return (data.number * data.cpps) - (data.cost) - ((data.number * data.cpps) * 0.01 + 1.25);
    }

    //Calculate Gain/ Loss total function
    $scope.gainLossTotal = function(stockData) {
      tempStock = stockData; // copy to tempStock so we can work on it
      var i;
      var gainLossTotal = 0;
      // Looping through specific stock (e.g. AIB) and caculating the total
      for (i = 0; i < tempStock.held.length; i++) {
        //We are re-using the calculateGainLoss function here to add to our total
        gainLossTotal += $scope.calculateGainLoss(tempStock.held[i]); // for the total row
      }
      // store the total back on the object to access in the html
      return gainLossTotal;
    }

    //Calculate Gain/ Loss Percentage function
    $scope.calculatePercentGainLoss = function(data) {
      return parseFloat((data.number * data.cpps)-data.cost)/(data.cost * 0.01)-1;
    }

    //Calculate selling costs function
    $scope.calculateSellCosts = function(data) {
      return((data.number * data.cpps) * 0.01 + 1.25);
    }
  }
]); 

