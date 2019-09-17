import React from 'react';
import './Game.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  class Board extends React.Component {

    renderSquare(i) {
    
      return (

        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
        var result =[];
        var index =0;
        for(let i =0;i<20;i++) {
            var rows =[];
            for(let j=0;j<20;j++) {
                rows.push(this.renderSquare(parseInt(index)));
                index++;
            }
            var row = <div className="board-row">{rows}</div>
            result.push(row);
        }
    
      return (
        <div>
            {result}
        </div>
      );
    }
  }
  export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(400).fill(null)
        }],
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
  
      let status;
      if (winner) {
        status = 'Xin chúc mừng, người chiến thắng là: ' + winner;
      } else {
        status = 'Lượt chơi tiếp theo: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
          <button onClick={()=>{this.setState({ history: history.concat([{
          squares: Array(400).fill(null)
        }]) })}} class="reStart">Chơi lại từ đầu</button>
            <div>{status}</div> 
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  
  function calculateWinner(squares) {
    var isSimilar = false;
    var countCheo=1;
    for (var i = 0; i < 20; i++) {
        var countNgang = 1;
        var countDoc = 1;
        for(var j=0;j<19;j++) {
            //Hàng ngang
            if(squares[i*20+j]!=null && squares[i*20+j+1]!=null) {
                if(squares[i*20+j] != squares[i*20+j+1]) {
                    countNgang = 1;
                } else {
                    countNgang++;
                    if(countNgang==5) {
                        return squares[i*20+j];
                    }
                }
            } else {
                countNgang = 1;
            }

            
            //Hàng dọc
            if (squares[j*20 + i] != null && squares[(j+1)* 20 + i] != null) {
                if(squares[j*20 + i] != squares[(j + 1)*20 + i]) {
                    return null;
                }  else {
                    countDoc++;
                    
                    if (countDoc == 5) {
                        countDoc = 1;
                        return squares[j * 20 + i];
                    }
                }
            } else {
                countDoc=1;
            }


        }
    }
    //Đường chéo
    for (var i = 0; i < 16; i++) {
      for(var j=0;j<16;j++) {
        if (squares[i*20 + j] != null && squares[(i+1)* 20 + j+1] != null) {
          if(squares[i*20 + j] != squares[(i+1)* 20 + j+1]) {
              return null;
          }  else {
            countCheo++;
              if (countCheo == 5) {
               countCheo = 1;
                 return squares[i * 20 + j];
             }
             break;
         }
     } else {

     }
      }
    }
    var duongCheoPhu = 1;
    for (var i = 0; i <16; i++) {
      for(var j=19;j>=5;j--) {
        if (squares[i*20 + j] != null && squares[(i+1)* 20 + j-1] != null) {
          if(squares[i*20 + j] != squares[(i+1)* 20 + j-1]) {
              return null;
          }  else {
            duongCheoPhu++;
              if (duongCheoPhu == 5) {
                duongCheoPhu = 1;
                 return squares[i * 20 + j];
             }
             break;
         }
     } else {

     }
      }
    }
    return null;
  }
    