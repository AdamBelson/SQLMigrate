var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
	companyid: Number,
	companyname: String,
	meters: [MeterSchema]
});

var MeterSchema = new Schema({
	meterid: Number,
	metername: String,
	siteid: Number,
	sitename: String,
	usage: [DailyUsageSchema]
});
	
var DailyUsageSchema = new Schema({
	usagedate: Date,
	usagedata: [Number]
},{_id:false});

mongoose.model('Company', CompanySchema);
mongoose.model('Meter', MeterSchema);
mongoose.model('DailyUsage', DailyUsageSchema);