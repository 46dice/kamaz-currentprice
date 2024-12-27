# Superset

---

## Запуск с Docker

Запускать в корне проекта

```shell
# Собрать\пересобрать контейнеры
make docker_build
```

```shell
# Запусть в docker compose
make docker_up
```

```shell
# # Остановить все контейнеры
make docker_down
```

## Запуск своего инстанса в Docker

Запускать в корне проекта

```shell
# Собрать\пересобрать контейнеры
например ./build.sh, собираете нужный вам контейнер, с нужным именем
```

```shell
# Отредактировать (создать файл) в корне проекта .env, например:
ldiv="_"
dport=7
FIO="mm"
login_registry=XXXXXXX
password_regitry=XXXXXXXXXXXXXXXXXXXXXXXXX
```

```shell
# Запусть в docker compose. Пробрасывает порт superset, 8088+dport. К именам контейнеров добавляется FIO.
./instance-up.sh
```

```shell


# # Остановить все контейнеры
./instance-down.sh
```

## Установка и запуск без Docker

0. Клонируем репозиторий

```shell
git clone http://gitlab.dev.sapiens/sapiens/superset.git
```

```shell
cd superset
```

```shell
sudo apt-get update
sudo apt-get install -y build-essential curl libssl-dev libffi-dev python3-dev python3-pip libsasl2-dev libldap2-dev default-libmysqlclient-dev

sudo apt install -y build-essential curl file git

#Установка brew на Ubuntu
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

#macOS
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install gcc curl openssl libffi python libsasl2 libldap mysql-client
```

### Сборка и запуск бекенда

1. Установить Python 3.8.16 с помощью pyenv

```shell
# Установить pyenv через brew
brew install pyenv

# Добавить в .bashrc или .zshrc
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
source ~/.bashrc #Перезапустить терминал

# Установить нужную версию Python
pyenv install 3.8.16

# Использовать установленную версию Python
pyenv global 3.8.16
```

2. Пример установки Python 3.8.16 и доп. пакетов для проекта

```shell
brew install openssl libffi python3 mysql-client
```

3. Создание виртуального окружения (venv)

```shell
cd superset
python3.8 -m venv venv
```

4. Активируем venv

```shell
source venv/bin/activate
```

5. Установка зависимостей pip

```shell
pip install --upgrade pip
pip install wheel
pip install --upgrade setuptools
```

Обязательно ставим

```shell
# Установка зависимостей из файла requirements/testing.txt
pip install -r requirements/testing.txt

# Если на этом этапе возникает ошибка, попробуйте откатить setuptools до версии 59.6.0:
pip install setuptools==59.6.0

# После этого снова попробуйте установить зависимости из requirements/testing.txt:
pip install -r requirements/testing.txt
```

В результате этого шага у вас должны установиться все пакеты без ошибок.

6. Настройка окружения для подключения к БД.

Структура проекта:

````text
-- ваша рабочая директория
   -- superset (в рабочей директории выполнена команда git clone ...)
   -- .superset (```shell mkdir .superset```)
   -- .sceletons-dev (```shell mkdir .sceletons-dev```)
````

7 Для настройки подключения к базе данных в './superset/config.py' подменяем переменную 'SQLALCHEMY_DATABASE_URI':
Локально:

```python
SQLALCHEMY_DATABASE_URI = "postgresql://<ваш логин>:<ваш пароль>@127.0.0.1:5432/superset"
```

В общем случае для подключения к удаленному серверу (чтобы не поднимать и не наливать базу локально):

```python
SQLALCHEMY_DATABASE_URI = "postgresql://<логин>:<пароль>@<адрес сервера>:5432/superset"
```

8 Устанавливаем конфиги виртуального окружения (venv) в терминале pycharm - log/pass для примера ставим superset
Локально:

```shell
export SUPERSET_HOME=<ваш путь к файлу>/.superset
export SUPERSET_SECRET_KEY="TEST_NON_DEV_SECRET"
export SECRET_KEY="TEST_NON_DEV_SECRET"
```

В общем случае для подключения к удаленному серверу:

```shell
export SUPERSET_HOME=<ваш путь к файлу>/.superset
export SUPERSET_SECRET_KEY=<ключ сервера>
export SECRET_KEY=<ключ сервера>
```

8.2 Для настройки подключения к базе данных в './superset/config.py' подменяем переменную 'SQLALCHEMY_DATABASE_URI':
Локально:

```python
SQLALCHEMY_DATABASE_URI = "postgresql://<ваш логин>:<ваш пароль>@127.0.0.1:5432/superset"
```

В общем случае к удаленному серверу.

```python
SQLALCHEMY_DATABASE_URI = "postgresql://<логин>:<пароль>@<адрес сервера>:5432/superset"
```

Не забыть в файле конфигурации указать рабочую директорию (файл superset). Также можно этот файл пометить в pycharm как source. (ПКМ на файле -> Mark Directory as -> Sources Root - файл станет синим)

8.3
Настройки окружения в файле конфигурации (Environment variables:) - как альтернатива пункту 10.1 аналогичные переменные можно прописать здесь

```text
PYTHONUNBUFFERED=1;FLASK_APP=superset;FLASK_ENV=development;SUPERSET_HOME=<ваш путь к файлу>/.superset;SECRET_KEY=TEST_NON_DEV_SECRET;SQLALCHEMY_DATABASE_URI=postgresql://<ваш логин>:<ваш пароль>@127.0.0.1:5432/superset;SUPERSET_SECRET_KEY=TEST_NON_DEV_SECRET
```

1.  Подключение БД

Инициализация БД, если она создаётся впервые:

```shell
superset init
```

Накатить скрипты миграции для базы данных

```shell
superset db upgrade
```

После этих шагов в папке <ваш путь к файлу>/.superset (см. структура проекта выше) должен появиться файл **superset.db**

Создаем админ пользователя

```shell
superset fab create-admin
```

12. **!!! Запуск в dev/debug режиме - (см. <Создаем файл конфигурации pycharm>) - run/debug ранее созданной конфигурации запуска !!!**

Опционально запуск из терминала

```shell
superset run -p 8088 --with-threads --host=0.0.0.0
```

13. Запуск с WSGI сервером (опционально) - целевой запуск п.12

```shell
# В корневом каталоге
gunicorn -w 2 -k gevent --worker-connections 100 --timeout 120 -b  0.0.0.0:8088 --limit-request-line 0 --limit-request-field_size 0 "superset.app:create_app()"
```

---

### Сборка и запуск фронтенда для разработки backend

1. Установить [Node.js](https://sberusersoft/#program/s/279) из SberUserSoft **версии 16.20.0**

2. Проверить текущую версию node.js:

```shell
node --version
```

3. Установить npm

```shell
sudo apt install npm
```

3. Переходим в superset-frontend

```shell
cd ./superset/superset-frontend
```

4. Правим файл .npmrc в директории superset-frontend (Сбер, пока не трогаем)

[Настройка .npmrc](https://confluence.sberbank.ru/pages/viewpage.action?pageId=15956351322)

5. Установить модули

```shell
npm install
```

6. В файле webpack.proxy-config.js проверяем URL:port нашего бэка, при необходимости меняем на нужный

```text
24 | const { supersetPort = 8088, superset: supersetUrl = null } = parsedArgs;
25 | const backend = (supersetUrl || `http://localhost:${supersetPort}`).replace(
```

7. Развернуть фронт - запускаем в файле package.json, предварительно запустив backend

```text
50 | "dev-server": "cross-env NODE_ENV=development BABEL_ENV=development node --max_old_space_size=4096 ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --mode=development",
```

---

### Сборка и запуск фронтенда

1. Устновить nvm

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

2. Установить node

```shell
nvm install 16.9.1
```

```shell
nvm use 16.9.1
```

```shell
npm install -g npm@8.1.2
```

Убедиться в правильной версии npm

```console
foo@bar:~$ nvm use 16.9.1
Now using node v16.9.1 (npm v8.1.2)

foo@bar:~$ npm --version
8.1.2
```

2.a Дополнение для Windows: остановить, очистить и перезапустить все контейнеры

```shell
docker system prune —all
```

```shell
docker build -t superset:test .
```

2.b В файле docker-compose-non-dev.yml заменить строчку

```shell
x-superset-image: &superset-image apache/superset:${TAG:-latest-dev}
```

На строчку

```shell
x-superset-image: &superset-image superset:test
```

2.с Запустить команду

```shell
docker-compose -f docker-compose-non-dev.yml up -d
```

3. Переходим в superset-frontend

```shell
cd ./superset/superset-frontend
```

4. Установить модули

```shell
npm install
```

```shell
npm run plugins:build
```

5. Запустить dev сервер

```shell
 npm run dev-server
```

6. Сбилдить фронт и запускать в обычном режиме

```shell
# В корневом каталоге (пункты 1-2 должны быть выполнены)
make build-cypress
# После успешной сборки, фронт откроется по ссылке запущенного суперсета
# (default http://localhost:8088/)
```

## Деплой в minikube-кластер основной ветки main

1. Сделать тэг версии согласно SemVer
2. Дождаться сборки контейнера и деплоя helm-чарта (автоматически)

## Деплой существующей версии контейнера minikube-кластер с чартом из любой ветки

1. Запустить пайплайн с выбором нужной ветки и указать переменную SUPERSET_VERSION_TAG = версии существующего тэга

## Деплой произвольного контейнера minikube-кластер с чартом из любой ветки (требует оповещения других пользователей дев стенда и перезапуска пайплайна main после завершения работ)

1. Запустить пайплайн с выбором нужной ветки и указать переменную IMAGE_NAME = желаемому тэгу
2. Запустить пайплайн с выбором нужной ветки и указать переменную SUPERSET_VERSION_TAG = имени тэга как в переменной IMAGE_NAME
