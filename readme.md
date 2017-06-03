Articles and videos showing the development of this project are posted at https://bedlamandclash.com/category/family-cookbook/.

## Installation

At the end of every article run the following steps to get the code as it is

1. Clone the repo

    ```
    git clone git@github.com:voqk/familycookbook.git
    cd familycookbook
    ```

2. Checkout the commit given at the end of the article. For example: to get the source after the first [post](https://bedlamandclash.com/2017/05/18/building-a-web-app-the-family-cookbook/).

    ```bash
    git checkout 66cc974 .
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run locally

    ```bash
    webpack-dev-server --open
    ```