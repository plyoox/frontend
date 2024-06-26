export default [
  {
    extends: ["next/core-web-vitals", "prettier", "plugin:jsx-a11y/recommended"],
    plugins: ["sort-imports-es6-autofix"],
    rules: {
      "sort-imports-es6-autofix/sort-imports-es6": [
        2,
        {
          ignoreCase: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "react/jsx-sort-props": [
        2,
        {
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
    },
  },
];
