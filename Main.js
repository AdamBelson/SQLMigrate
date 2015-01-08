var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Usage');

require('./models/meterusage_model.js');
var Company = mongoose.model('Company');
var Meter = mongoose.model('Meter');
var DailyUsage = mongoose.model('DailyUsage');

function addUsage(){
	
	console.time('Build Data');
	
	var meterlist = []
	for (var m = 751; m <= 1000; m++)
	{
	console.log(m);
		var dailyusage = [];
		for (var i = 1; i<=1095; i++)
		{
			var date = new Date(2011,12,31);
			date.setDate(date.getDate() + i);
			
			var datausage = [];
			for (var j = 1; j<=48; j++)
			{	
				datausage.push(Math.random() * 50);
			}
			
			dailyusage.push(new DailyUsage({usagedate: date, usagedata: datausage}));
		}
		
		var meter = new Meter({meterid: m, metername: 'Meter', siteid: m , sitename: 'Site', usage: dailyusage});
		
		meterlist.push(meter);
		
		meter.save(function(err, meter){
				if (err){
					console.log(err);
				} else {
					console.log('Meter saved');
				}
			  });
	}

	var company = new Company({companyid: 1234, companyname: 'TestCompany', meters: meterlist});
	
	console.timeEnd('Build Data');
  }
  
addUsage();

/*
var config = {
  server: '172.26.6.23'
  ,userName: 'sa'
  ,password: 'samura1'
};
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
		console.log(err);
	} else {
		executeStatement();
	}
  }
);
connection.on('debug', function(text) {
    //console.log(text);
  }
);
function executeStatement() {
  request = new Request("select * from eMarket.dbo.CHPType for xml auto", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }

    connection.close();
  });
  
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });

  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
  });

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);

}
*/


 