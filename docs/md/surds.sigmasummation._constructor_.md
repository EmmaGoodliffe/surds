<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [surds](./surds.md) &gt; [SigmaSummation](./surds.sigmasummation.md) &gt; [(constructor)](./surds.sigmasummation._constructor_.md)

## SigmaSummation.(constructor)

Constructs a new instance of the `SigmaSummation` class

<b>Signature:</b>

```typescript
constructor(lowerBound: Int, upperBound: Int, term: (x: Int | Variable) => Surd, indexSymbol?: string);
```

## Parameters

| Parameter   | Type                                                                                                | Description                                                             |
| ----------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| lowerBound  | [Int](./surds.int.md)                                                                               | Lower bound (under sigma in notation)                                   |
| upperBound  | [Int](./surds.int.md)                                                                               | Upper bound (above sigma in notation)                                   |
| term        | (x: [Int](./surds.int.md) \| [Variable](./surds.variable.md)<!-- -->) =&gt; [Surd](./surds.surd.md) | Function returning term (argument of sigma in notation)                 |
| indexSymbol | string                                                                                              | Index symbol (under sigma in notation and usually "x", "n", "r" or "i") |
