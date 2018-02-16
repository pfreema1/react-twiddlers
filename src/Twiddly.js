import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Twiddly.css';

/*
OrderScreen.propTypes = {
  userCoords: PropTypes.object,
  defaultDropoff: PropTypes.object,
  pickup: PropTypes.object,
  dropoff: PropTypes.object,
  pickup_at: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  updateOrderDetails: PropTypes.func.isRequired,
  createNeed: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired
};
*/

class Twiddly extends Component {
  constructor(props) {
    super(props);

    this.w = this.props.width;
    this.h = this.props.height;
    // ??????
    this.angleArc = this.props.angleArc * Math.PI / 180; //props.angleArc default = 360
    this.angleOffset = this.props.angleOffset * Math.PI / 180; //props.angleOffset default = 0
    this.startAngle = 1.5 * Math.PI + this.angleOffset;
    this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;

    console.log('angleOffset:  ', this.angleOffset);
    console.log('angleArc:  ', this.angleArc);

    this.state = {};
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  handleMouseDown = e => {
    console.log(e);
  };

  // Calculate ratio to scale canvas to avoid blurriness on HiDPI devices
  getCanvasScale = ctx => {
    const devicePixelRatio =
      window.devicePixelRatio ||
      window.screen.deviceXDPI / window.screen.logicalXDPI || // IE10
      1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  };

  drawCanvas() {
    const ctx = this.canvasRef.getContext('2d');
    const scale = this.getCanvasScale(ctx);
    console.log('scale:  ', scale);

    this.canvasRef.width = this.w * scale;
    this.canvasRef.height = this.h * scale;
    ctx.scale(scale, scale);

    this.xy = this.w / 2; //coordinates of canvas center
    this.lineWidth = this.xy * this.props.thickness;
    this.radius = this.xy - this.lineWidth / 2;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.props.lineCap;
    // background arc
    ctx.beginPath();
    ctx.strokeStyle = this.props.bgColor;
    // ?????
    // why - and + 0.00001 ?
    // what are all these parameters doing?
    ctx.arc(
      this.xy,
      this.xy,
      this.radius,
      this.endAngle - 0.00001,
      this.startAngle + 0.00001,
      true
    );
    ctx.stroke();
    //foreground arc
  }

  render() {
    return (
      <div style={{ width: this.w, height: this.h, display: 'inline-block' }}>
        <canvas
          ref={ref => {
            this.canvasRef = ref;
          }}
          style={{ width: '100%', height: '100%' }}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
}

/*****************************/

Twiddly.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  thickness: PropTypes.number,
  lineCap: PropTypes.oneOf(['butt', 'round']),
  bgColor: PropTypes.string,
  angleArc: PropTypes.number,
  angleOffset: PropTypes.number
};

Twiddly.defaultProps = {
  width: 200,
  height: 200,
  thickness: 0.35,
  lineCap: 'butt',
  bgColor: '#617CF7',
  angleArc: 180,
  angleOffset: 0
};

export default Twiddly;
