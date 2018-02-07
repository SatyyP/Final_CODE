// for concentric circles.
var dataset = [
    {
        name: 'outsideH',
        r: "275",
        cx: 600,
        cy: 300,
        color: '#CBFFFE',//ECFFFF', //'#F0FFF8', // '#CFE8FF'
        Stroke: 'lightgray',
        strokewidth: 0
    },
    {
        name: 'outsideT',
        r: "220",
        cx: 600,
        cy: 300,
        color: '#FFE8DD',//FCEFE2',
        strokewidth: 0
        //        Stroke: 'darkblue'
    },
    {
        name: 'insideH',
        r: "161",
        cx: 600,
        cy: 300,
        color: '#EDFFFF',//E4FFFF',//E4FFFF', // #F0FFF8 // '#CFE8FF'
        Stroke: '#FFFFF8',
        strokewidth: 8
    },
    {
        name: 'insideT',
        r: "110",
        cx: 600,
        cy: 300,
        color: '#FFFAEA',//FFE8DD',//F7E1D6', // FCEFE2
        strokewidth: 0

        //        Stroke: 'darkblue'
    },
    {
        name: 'current',
        r: "55",
        cx: 600,
        cy: 300,
        color: '#FFFFFF',
        strokewidth: 0
        //        Stroke: 'darkblue'
    }
    ]
// concentric circles generation

d3.select('svg')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('r', (d, i) => d.r)
    .attr('cx', (d, i) => d.cx)
    .attr('cy', (d, i) => d.cy)
    .attr('fill', (d, i) => d.color)
    .attr('stroke', (d, i) => d.Stroke)
    .attr('stroke-width', (d, i) => d.strokewidth)




d3.select('svg')
    .append('text')
    .text('Now')
    .attr('x', 580)
    .attr('y', 10)


d3.select('svg')
    .append('text')
    .text('9°C')
    .attr('x', 602)
    .attr('y', 290)

d3.select('svg')
    .append('text')
    //    .text('9°c')
    .text('84%')
    .attr('x', 602)
    .attr('y', 315)

d3.select('svg')
    .append('rect')
    .attr('width', 20)
    .attr('height', 10)
    .attr('x', 572)
    .attr('y', 280)
    .attr('fill', '#CC0000')

d3.select('svg')
    .append('use')
    .attr('transform', 'scale(.2,.2)')
    .attr('x', 2865)
    .attr('y', 1495)
    .attr('fill', 'blue')
    .attr('xlink:href', function (d, i) {
        return '#drop'
    })

//  Xaxis, Yaxis
d3.select('svg')
    .append('line')
    .attr('x1', 598)
    .attr('y1', 15)
    .attr('x2', 598)
    .attr('y2', 245)
    .attr('stroke', 'gray') //#D17B5D

d3.select('svg')
    .append('line')
    .attr('x1', 312)
    .attr('y1', 300)
    .attr('x2', 544)
    .attr('y2', 300)
    .attr('stroke', 'gray')

d3.select('svg')
    .append('line')
    .attr('x1', 598)
    .attr('y1', 355)
    .attr('x2', 598)
    .attr('y2', 585)
    .attr('stroke', 'gray')

d3.select('svg')
    .append('line')
    .attr('x1', 655)
    .attr('y1', 300)
    .attr('x2', 885)
    .attr('y2', 300)
    .attr('stroke', 'gray')






var myColor = d3.scaleLinear()
    .domain([5, 15])
    .range(['#FF9900', '#CC0000']) //'#FF9900'

var myColorH = d3.scaleLinear()
    .domain([20, 100])
    //    .range(['#CFD6EA','#009BFF'])
    .range(['#C3D5E5', '#009DFF'])
var myColorI = d3.scaleLinear()
    .domain([16, 18])
    .range(['#FF9900', '#CC0000'])

var mainGroup = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(600,300)')

function build(path) {

    d3.csv(path, function (data) {

        var mapTemp = d3.scaleLinear() // outside temperature
            .domain([0, 10])
            .range([0, 30])

        var mapTempI = d3.scaleLinear() // inside temperature
            .domain([0, 10])
            .range([0, 15])

        var mapHum = d3.scaleLinear() // humidity
            .domain([0, 100])
            .range([0, 8])

        var myGroups = mainGroup
            .selectAll('g')
            .data(data)

        var enterGroups = myGroups.enter()
            .append('g')


        myGroups.merge(enterGroups)
            .transition()
            .duration(1000)
            .attr('transform', (d, i) => 'rotate(' + (360 / data.length * i) + ')')
        //            .duration(3000)
        // inside temperature rect generation
        enterGroups.append('rect')
            .transition()
            .duration(3000)
            .attr('width', 4)
            .attr('height', (d, i) => mapTempI(d.temp1)) // NEW Dataset as temp1
            .attr('y', 55)
            .style('fill', (d, i) => myColorI(d.temp1)) // new dataset as temp 1

        // outside temperature rect generation
        enterGroups.append('rect')
            .transition()
            .duration(3000)
            .attr('width', 4)
            .attr('height', (d, i) => mapTemp(d.temp))
            .attr('y', 165)
            .style('fill', (d, i) => myColor(d.temp))

        // inside humidity circle generation.
        enterGroups.append('circle')
            .transition()
            .duration(3000)
            .attr('r', (d, i) => mapHum(d.hum))
            .attr('cy', 135.5) // 137.5
            .style('fill', (d, i) => myColorH(d.hum))

        enterGroups.append('circle')
            .transition()
            .duration(3000)
            .attr('r', (d, i) => mapHum(d.hum))
            .attr('cy', 247.5)
            .style('fill', (d, i) => myColorH(d.hum))

        myGroups.exit()
            .remove()
    })

}

var text1 = d3.select('svg')
    .append('text')
    .attr('x', 290)
    .attr('y', 300)
    .style('text-anchor', 'end')

var text2 = d3.select('svg')
    .append('text')
    .attr('x', 580)
    .attr('y', 600)
    .style('text-anchor', 'middle')

var text3 = d3.select('svg')
    .append('text')
    .attr('x', 900)
    .attr('y', 300)

var text4 = d3.select('svg')
    .append('text')
    .attr('x', 50)
    .attr('y', 55)
    .style('font-size', '35')

var text5 = d3.select('svg')
    .append('text')
    .attr('x', 50)
    .attr('y', 80)
    .style('font-size', '15')
// Loading data set
var count = 0
setInterval(function () {

    if (count === 0) {
        build('DATA_DAY.csv')
        text1.text('12 hours ago')
        text2.text('18 hours ago')
        text3.text('24 hours ago')
        text4.text('1 day')
        text5.text('11/Jan/2018')
    }

    if (count === 1) {
        build('DATA_MONTH.csv')
        text1.text('2 Weeks ago')
        text2.text('3 Weeks ago')
        text3.text('4 Weeks ago')
        text4.text('1 month')
        text5.text('11/Dec/2017 - 11/Jan/2018')
    }

    if (count === 2) {
        build('DATA_YEAR.csv')
        text1.text('3 Months ago')
        text2.text('6 Months ago')
        text3.text('9 Months ago')
        text4.text('1 year')
        text5.text('11/Jan/2017 - 11/Jan/2018')
    }
    count++
    if (count > 2) count = 0

}, 3000)


d3.select('svg') //1
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 1065)
    .attr('y', 370)
    .attr('stroke', 'gray')
    .style('fill','#FFFAEA')

d3.select('svg') //3
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 1065)
    .attr('y', 400-10)
    .attr('stroke', 'gray')
    .style('fill','#EDFFFF')

d3.select('svg') //2
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 1065)
    .attr('y', 430+10)
    .attr('stroke', 'gray')
    .style('fill','#FFE8DD')

d3.select('svg') //4
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 1065)
    .attr('y', 460)
    .attr('stroke', 'gray')
    .style('fill','#CBFFFE')



// LEGENDS TEXT
d3.select('svg') //1
    .append('text')
    .text('Inner Temperature')
    .style("font-size", "10px")
    .attr('x', 1085)
    .attr('y', 379)

d3.select('svg') //3
    .append('text')
    .text('Inner Humidity')
    .style("font-size", "10px")
    .attr('x', 1085)
    .attr('y', 408-10)

d3.select('svg') //2
    .append('text')
    .text('Outer Temperature')
    .style("font-size", "10px")
    .attr('x', 1085)
    .attr('y', 437+10)

d3.select('svg') //4
    .append('text')
    .text('Outer Humidity')
    .style("font-size", "10px")
    .attr('x', 1085)
    .attr('y', 469)
// proper dataset