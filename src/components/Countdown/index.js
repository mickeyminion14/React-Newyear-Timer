import React, {Component} from 'react';
import Timer from './Timer'
import Controls from './Controls'
import moment from 'moment';
class Countdown extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      duration :this.getRemainingTime(),
      paused : false
    };
    this.handlePausedToogle = this.handlePausedToogle.bind(this);
  }

  componentDidMount() {
    this.resume();
   }
   componentWillUnmount() {
     this.pause();
   }
 
   getRemainingTime() {
     let now = moment(),
         newYear = moment({year : now.year()+1}),
         diff = newYear.diff(now);
     
     return moment.duration(diff);
   }
 
   // handlePausedToogle = () => {} for binding alternative for accesing this keyword
   handlePausedToogle () {
     this.setState((prevState, props) => {
       const paused = !prevState.paused;
       
       if(paused) {
         this.pause();
       }
       else {
         this.resume();
       }
       
       return {
         paused
       }
     })
   }
 
   pause () {
     clearInterval(this.interval);
   }
 
   resume () {
     this.interval = setInterval( () => {
       this.setState({
         duration : this.getRemainingTime()
       });
     },1000);
   }
 
  render () {
    const {duration, paused} = this.state;

    return (
      <section className="hero is-dark is-bold is-fullheight has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
           New Year is Coming Up !
          </h1>
         <section className="section">
         < Timer duration={duration} />
         </section>
           <Controls paused = {paused} 
                    onPausedToggle = {this.handlePausedToogle}
           />
          </div>
        </div>
    </section>
    );
  }
}

export default Countdown;