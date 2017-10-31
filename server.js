var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/lineupgenerator', function(request, response){
   combos=generate_lineups(request.body.body);
   response.status(200).send(String(combos));    
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000);



function generate_lineups(combos) {
	qbs=[]
	rbs=[]
	wrs=[]
	tes=[]
	ds=[]
	ks=[]

	combos=JSON.parse(combos).type.options;

	for(var i = 0; i < combos.length; i++) {
    		var obj = combos[i];
		if(obj.pos=="QB"){qbs.push(obj);}
		else if (obj.pos=="RB"){rbs.push(obj);}
		else if (obj.pos=="WR"){wrs.push(obj);}
		else if (obj.pos=="TE"){tes.push(obj);}
		else if (obj.pos=="D"){ds.push(obj);}
		else if (obj.pos=="K"){ks.push(obj);}
	}

	lineups=[];
	totalSalary=0;	
	for(var a=0;a<qbs.length;a++){
		//totalSalary+=qbs[a].qb.salary
		for(var b=0;b<rbs.length;b++){
			
			for(var c=b+1;c<rbs.length;c++){
				for(var d=0;d<wrs.length;d++){
					for(var e=d+1;e<wrs.length;e++){
						for(var f=e+1;f<wrs.length;f++){
							for(var g=0;g<tes.length;g++){
								for(var h=0;h<ds.length;h++){
									for(var i=0;i<ks.length;i++){
										
										totalSalary=parseInt(qbs[a].salary)+parseInt(rbs[b].salary)+parseInt(rbs[c].salary)+parseInt(wrs[d].salary)+parseInt(wrs[e].salary)+parseInt(wrs[f].salary)+parseInt(tes[g].salary)+parseInt(ds[h].salary)+parseInt(ks[i].salary)
										if(parseInt(totalSalary)<60000){
											if(qbs[a].average!=''&&rbs[b].average!=''&&rbs[c].average!=''&&wrs[d].average!=''&&wrs[e].average!=''&&wrs[f].average!=''&&tes[g].average!=''&&ds[h].average!=''&&ks[i].average!=''){
												average=parseInt(qbs[a].average)+parseInt(rbs[b].average)+parseInt(rbs[c].average)+parseInt(wrs[d].average)+parseInt(wrs[e].average)+parseInt(wrs[f].average)+parseInt(tes[g].average)+parseInt(ds[h].average)+parseInt(ks[i].average);
												lineups.push(qbs[a].name+","+rbs[b].name+","+rbs[c].name+","+wrs[d].name+","+wrs[e].name+","+wrs[f].name+","+tes[g].name+","+ds[h].name+","+ks[i].name+","+average);
											}
											else{lineups.push(qbs[a].name+","+rbs[b].name+","+rbs[c].name+","+wrs[d].name+","+wrs[e].name+","+wrs[f].name+","+tes[g].name+","+ds[h].name+","+ks[i].name);}
										}
										
									}			
								}			
							}				
						}				
					}				
				}				
			}				
		}				
	}


	var csv = lineups.join("\n");
	return csv;

}
