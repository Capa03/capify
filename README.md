# Query Builder Specification

## Common Types

### String

Strings can be queried using various operators to match patterns or exact values.

![image](https://github.com/user-attachments/assets/9c71b06f-e2b7-43d1-b3c5-3ddc73e1b447)


```json
{
  "condition": "and",
  "rules": [
    {
      "field": "name",
      "operator": "contains",
      "value": "example"
    }
  ]
}
```

**Possible Operators:**

- `=`: Exact match
- `!=`: Not equal
- `contains`: Contains substring

**Additional Features:**

- **Case Sensitivity:** Provide options for case-sensitive and case-insensitive searches.
- **Regular Expressions:** Support for advanced pattern matching using regular expressions.

### Integer

Integers can be compared using standard mathematical operators.

![image](https://github.com/user-attachments/assets/0609dd66-758e-4a32-8a96-77f771e6a7c5)


```json
{
  "condition": "and",
  "rules": [
    {
      "field": "age",
      "operator": "=",
      "value": 1
    }
  ]
}
```

**Possible Operators:**

- `==`: Equal to
- `!=`: Not equal to
- `<`: Less than
- `>`: Greater than
- `>=`: Greater than or equal to
- `<=`: Less than or equal to

### Boolean

Booleans are checked directly for their truth value.

![image](https://github.com/user-attachments/assets/cec10c70-e2eb-41fe-8c98-ef89aa9c50d8)


```json
{
  "condition": "and",
  "rules": [
    {
      "field": "educated",
      "value": false
    }
  ]
}
```

**Note:** The value is checked directly since the default is `false`.

## Arrays or Lists

### In Operator

Use the `in` operator to check if a field's value is within a specified list.

Green are the choosen values to evaluate:
![image](https://github.com/user-attachments/assets/d254a4d8-9c59-416e-8d6d-159169da792a)

```json
{
  "condition": "and",
  "rules": [
    {
      "field": "occupation",
      "operator": "in",
      "value": ["student", "teacher", "unemployed"]
    }
  ]
}
```

### Not In Operator

The `not in` operator checks if a field's value is not within a specified list.

```json
{
  "condition": "and",
  "rules": [
    {
      "field": "occupation",
      "operator": "not in",
      "value": ["teacher", "unemployed"]
    }
  ]
}
```

## Date and Time Handling

Dates and times are treated as timestamps and can be queried using specific operators.

### Before and After

Check if a date or time is before or after a specified timestamp.

```json
{
  "condition": "and",
  "rules": [
    {
      "field": "date",
      "operator": "before",
      "value": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### Between

Check if a date or time falls within a specified range.

![image](https://github.com/user-attachments/assets/7c4e23e1-e9eb-4841-a9d6-f73b87fb4e55)


```json
{
  "condition": "and",
  "rules": [
    {
      "field": "date",
      "operator": "between",

      "start": "2023-01-01T00:00:00Z",
      "end": "2023-12-31T23:59:59Z"
    }
  ]
}
```

## Null and Undefined Values

Handle `null` and `undefined` values explicitly using specific operators for fields like objects or lists.

![image](https://github.com/user-attachments/assets/204b707f-ca14-4295-96e9-0ef14284d819)


- `is null`: Check if the value is `null`.
- `is not null`: Check if the value is not `null`.

## Validation

Ensure that the query structure is valid and that the operators are compatible with the field types. 

## Nested Queries

Support for nested queries.

```json
{
  "condition": "and",
  "rules": [
    {
      "field": "name",
      "operator": "=",
      "value": "John"
    },
    {
      "condition": "or",
      "rules": [
        {
          "field": "age",
          "operator": ">",
          "value": 30
        },
        {
          "field": "occupation",
          "operator": "in",
          "value": ["student", "teacher"]
        }
      ]
    }
  ]
}
```

### TypeScript Interface

```typescript
type Condition = 'and' | 'or';

interface Query {
    condition: Condition;
    rules: Rule[];
}

interface Rule {
    field: string;
    operator: Operator;
    value: any; 
    entity?: string; 
}

type Operator = StringOperator | NumberOperator | BooleanOperator | ArrayOperator | DateOperator;

enum StringOperator {
    Equals = '=',
    NotEquals = '!=',
    Contains = 'contains',
    CaseSensitive = 'case-sensitive',
    CaseInsensitive = 'case-insensitive',
    Regex = 'regex'
}

enum NumberOperator {
    Equals = '==',
    NotEquals = '!=',
    LessThan = '<',
    GreaterThan = '>',
    LessThanOrEqual = '<=',
    GreaterThanOrEqual = '>='
}

enum BooleanOperator {
    IsTrue = 'true',
    IsFalse = 'false'
}

enum ArrayOperator {
    In = 'in',
    NotIn = 'not in'
}

enum DateOperator {
    Before = 'before',
    After = 'after',
    Between = 'between'
}

interface DateRule extends Rule {
    operator: DateOperator.Between;
    start: string; 
    end: string;  
}

// Example usage
const query: Query = {
    condition: 'and',
    rules: [
        {
            field: 'name',
            operator: StringOperator.Like,
            value: 'John'
        },
        {
            condition: 'or',
            rules: [
                {
                    field: 'age',
                    operator: NumberOperator.GreaterThan,
                    value: 30
                },
                {
                    field: 'occupation',
                    operator: ArrayOperator.In,
                    value: ['student', 'teacher']
                }
            ]
        }
    ]
};
```

### Key Points

1. **Operators as Enums**: Using enums for operators helps in ensuring that only valid operators are used for each data type.

2. **Date Rule Interface**: For the `between` operator in dates, a separate interface `DateRule` can be used to handle the `start` and `end` values.

3. **Entity Field**: The `entity` field is optional and can be included if you need to specify which entity the field belongs to.

4. **Type Safety**: The `value` field is currently typed as `any`. You can further refine this based on the operator being used to ensure type safety.

5. **Nested Queries**: The structure supports nested queries by allowing `rules` to contain another `Query` object.
