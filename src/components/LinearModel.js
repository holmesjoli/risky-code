import * as ml from "mljs";
import * as mlmatrix from "ml-matrix"

// Our training set (X,Y).
const X = new mlmatrix.Matrix([[0, -1], [1, 0], [1, 1], [1, -1], [2, 0], [2, 1], [2, -1], [3, 2], [0, 4], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [1, 10], [1, 12], [2, 10], [2, 11], [2, 14], [3, 11]]);
const Y = mlmatrix.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]);

// The test set (Xtest, Ytest).
const Xtest = new mlmatrix.Matrix([
  [0, -2],
  [1, 0.5],
  [1.5, -1],
  [1, 2.5],
  [2, 3.5],
  [1.5, 4],
  [1, 10.5],
  [2.5, 10.5],
  [2, 11.5],
]);
const Ytest = mlmatrix.Matrix.columnVector([0, 0, 0, 1, 1, 1, 2, 2, 2]);

// We will train our model.
const logreg = new ml.LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });
logreg.train(X, Y);

// We try to predict the test set.
const finalResults = logreg.predict(Xtest);