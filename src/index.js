module.exports = function solveSudoku(matrix) {
    solve(matrix);

    function solve(matrix){
        var solved = true;
        for (var r=0;r<9;r++){
            if (matrix[r].indexOf(0)!=-1) solved = false;
        } 
        if (solved) return true;

        var possibleValues=[];

        for (var i=0;i<9;i++)
            for (var j=0;j<9;j++){
                if (matrix[i][j]==0){
                    possibleValues=checkPossibleValues(matrix,i,j);
                    for(var b=0;b<possibleValues.length; b++){
                    matrix[i][j]=possibleValues[b];
                    if (solve(matrix)) {
                        return true;
                    }
                    matrix[i][j]=0;
                }
                return false;
            }
        }
    }

    function checkRow(row){
        return [1,2,3,4,5,6,7,8,9].filter((i)=>{
            return row.indexOf(i)<0;
        })
    }

    function checkColumn(numberOfColumn){
        var arr=[];
        for (var i=0;i<9;i++){
            arr[i]=matrix[i][numberOfColumn];
        }
        return checkRow(arr);
    }

    function checkSquare(numberOfRow,numberOfColumn){
        var startR=numberOfRow<3?0:
                  numberOfRow>5?6:3;
        var startC=numberOfColumn<3?0:
                  numberOfColumn>5?6:3; 
        var arr=[];
        for (var r=startR;r<startR+3;r++)
            for (var c=startC;c<startC+3;c++){
                arr.push(matrix[r][c]);
        }
        return checkRow(arr);     
    }

    function checkPossibleValues(matr,elementRow,elementColumn){
        var row=checkRow(matr[elementRow]);
        var column=checkColumn(elementColumn);
        var square=checkSquare(elementRow,elementColumn);

        var arr=row.length>column.length ?
                row.length>square.length ? row : square
               :column.length>square.length ? column : square;

        return arr.filter((i)=>{
            return ~row.indexOf(i) && ~column.indexOf(i) && ~square.indexOf(i);
        });
    }
        return matrix;

    }