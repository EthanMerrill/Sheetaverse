// https://observablehq.com/@mbostock/wave-motion
const drawChart = (container, width) => {
    const height = 2000;

    const canvas = d3.select(container).append("canvas")
        .attr("id", "canvas")
        .attr("width", width)
        .attr("height", height)
        .attr('position', 'absolute')
        .attr('top', '0px')
        .attr('z-index' , '-1')
    // .style('background-color', '#f0f0f0');


   
    // set vars
    var ringRadius = 40
    var ringSeparation = ringRadius * 11 / 7
    var dotRadius = 1.5
    var n = (width + ringRadius) / ringSeparation
    var m = (height + ringRadius) / ringSeparation
    const refreshRate = 100 / 60;

    const context1 = canvas.node().getContext('2d');
    const context2 = canvas.node().getContext('2d')
    // const div = `${context2.canvas}${context1.canvas}`;
    context1.fillStyle = '#f0f0f0';
    // context2.canvas.style.position = "absolute";
    context1.beginPath();
    for (let i = -1; i < n; ++i) {
        for (let j = -1; j < m; ++j) {
            context1.moveTo(i * ringSeparation + ringRadius, j * ringSeparation);
            context1.arc(i * ringSeparation, j * ringSeparation, ringRadius, 0, 2 * Math.PI);
        }
    }
    // context1.lineWidth = 0.25;
    // context1.stroke();
    window.setInterval(()=> {
        const t = performance.now()/1000;
        context2.clearRect(0, 0, width, height);
        context2.beginPath();
        for (var i = -1; i < n; ++i) {
            for (var j = -1; j < m; ++j) {
                context2.save();
                context2.translate(i * ringSeparation, j * ringSeparation);
                context2.rotate((i + j) / 6 + t);
                context2.moveTo(ringRadius + dotRadius, 0);
                context2.arc(ringRadius, 0, dotRadius, 0, 2 * Math.PI);
                context2.restore();
                
            }
        }
        context2.fill();
    }, refreshRate)

    

}
    