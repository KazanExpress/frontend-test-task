# Тестовое задание Front-End

Здесь находится описание тестового задания на позицию Front-End-разработчика в KazanExpress.\
Если вы нашли его случайно - попробуйте сделать! Авось и вас к себе возьмём. 😉

[RU](README.md) | [EN](README_EN.md)

## Задача

Создать одностраничное TODO-приложение с использованием Vue.js,\
с возможностью ведения/импорта/экспорта проектов.

Приложение может быть имплементировано в одном из уровней сложности:

- [**Easy**](#easy) - на данный момент решения этой сложности не принимаются;
- [**Medium**](#medium) - **Easy** с дополнительными усложнениями, минимально-оцениваемый функционал;
- [**Hard**](#hard) - **Medium** с дополнительными усложнениями;
- [**Insane**](#insane) - главный челлендж - примем с распростёртыми объятиями, если сделаете! 😉

каждый из которых имеет опциональные задания с более высокой оценкой.

## Подробные требования задачи

Ниже приведены подробные требования к приложению, разделённые по сложности.\
Каждая последующая сложность включает в себя **все** требования предыдущей как обязательные.

---

### **Easy**

- Каждая новая вкладка в бразуере с приложением - отдельный проект со своим списком задач;\
  Система переключения проектов **в пределах одной вкладки считается нарушением** этого требования!
- Редактируемое название проекта в качестве заголовка страницы;
- Список с задачами:
  - Добавление новой задачи в список;
  - Удаление любой задачи из списка;
  - Возможность пометить любую задачу сделанной и возможность убрать эту пометку (mark as done/not done);
- Вся информация (название проекта, список задач, состояние задач) должна сохраняться при перезагрузке страницы;

Опционально:
- Возможность добавлять подзадачи в любую задачу (с потенциально бесконечной глубиной);
- Поле ввода для поиска/фильтрации задач в списке (фильтр должен сохраняться после перезагрузки страницы);
- Возможность редактирования названия задачи после её создания;

---

### **Medium**

Все требования [**easy**](#easy), включая опциональные.
А также:

- Возможность перемещать любые задачи (со всем списком подзадач) из любого открытого проекта в любой другой открытый проект;
- Нельзя использовать `LocalStorage`, `Cookies`, `IndexedDB` и `WebSQL` хранилища;\
  Если ваше приложение пишет *хоть что-нибудь* в одно из этих хранилищ - **требование считается невыполненным**!\
  Это касается и библиотек, которые используют эти типы хранилищ: например - `vuex-multi-tab-state`.
- Экспорт проекта в файл / импорт проекта из файла;
  - Имя сохраняемого файла должно соответствовать названию проекта.
- Drag-n-drop для перемещения задач в списке;
- Сохранение текущего фильтра для возможности его быстрого применения потом;
- Итоговое приложение должно весить не более **200 KB** (сумма всех загружаемых файлов, исключая картинки);

Опционально:
- Наличие CSS-анимаций для drag-n-drop и фильтрации задач;
- Использовать TypeScript для 100% кодовой базы (исключая вёрстку и стили);
- Использовать [Vue Composition API](https://vue-composition-api-rfc.netlify.com/) или [vue@next](https://www.npmjs.com/package/vue/v/next);
- Использовать ESLint/TSLint для контроля качества кода (приветствуется использование настройки [KazanExpress/TSLint](https://github.com/KazanExpress/tslint));
- Использовать сборщик/бандлер (например, [webpack](https://webpack.js.org/)) для сборки приложения в SPA;

---

### **Hard**

Все требования [**medium**](#medium), включая опциональные, а также:

- Итоговое приложение должно весить не более **100 KB** (сумма всех загружаемых файлов, исключая картинки);
- Drag-n-drop с поддержкой тач-скрина;
- Масштабируемость на мобильные устройства до 320*480px (iPhone 4);
- Возможность быстрого просмотра и редактирования описания у любой задачи;

Опционально:
- [SSR](https://google.com/search?q=SSR+(web+development));
- [PWA](https://google.com/search?q=PWA+(web+development));
- Опция фильтрации задач по RegExp;
<!-- - Если в двух вкладках открыт один и тот же проект (например, совершён импорт из одного и того же файла),\
  **все** действия в этих вкладках/проектах должны синхронизироваться без задержки.\
  Включая (но не ограничиваясь):
  - Название проекта;
  - Список, состояния, описания, порядок и названия всех задач\
    (например, при добавлении задачи в одной вкладке - она должна появиться и в другой);
  - Список сохранённых фильтров; -->
- Возможность добавлять/удалять именованные списки для задач, между которыми их можно перетаскивать (как в trello);

---

### **Insane**

> Мы можем только апплодировать вашим смелости и скиллу, если решитесь делать задание на этой сложности. 👏\
> Ну и ещё принять вас к себе с распростёртыми объятиями, конечно!

Все требования [**hard**](#hard), включая опциональные, а также:

- Нельзя использовать `Vue.js` или любые другие фреймворки/библиотеки для клиентской части - только нативный JavaScript/TypeScript;\
  В том числе:
  - Для реактивности/биндинга данных;
  - Для внесения изменений в DOM;
  - Для бизнес-логики;
  - Да, jQuery/React/Lodash/Underscore/Bootstrap тоже нельзя!
- Документация на JSDoc, по всем стандартам;
- Итоговое приложение должно весить не более **50 KB** (сумма всех загружаемых файлов, исключая картинки);
- Итоговый скомпилированный проект должен работать на нативных ES6-модулях с помощью `<script type="module">`;
- Наличие [Source-Maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) для итогового приложения и инструкции по их включению;
- Полный набор горячих клавиш для каждого действия в приложении - создание/удаление/редактирование тасок/проектов, экспорт/импорт и прочее;\
  (Обязательна инструкция со списком всех горячих клавиш.)
- Оценка качества кода "**A**" на [Code Climate](https://codeclimate.com);

Опционально:
- Использовать [Conventional Commitlint](https://github.com/conventional-changelog/commitlint);
- Использовать [CustomElements/WebComponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) и [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM);
- 100% test coverage с использованием Jest/Mocha и [Coveralls](https://coveralls.io)/[Code Climate](https://codeclimate.com);
- Использовать travis.ci, [now.sh](https://zeit.co/home), GitHub Pages или GitHub Actions для CI/CD;
- Использовать [Service-Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) для уведомления пользователя о новых версиях;
- Взаимоисключающие пункты:
  - [SSR](https://google.com/search?q=SSR+(web+development)) без использования сторонних библиотек;
  - Отсутствие SSR **и** отсутствие бандлера (webpack, rollup, etc.), node_modules и прочего - т.е. нельзя использовать никакие библиотеки (кроме TypeScript) для обработки кода;


---

<details><summary>Для тех, кто не любит формальности</summary>
Короче, надо написать очень всратый менеджер задач. Его таким просим, чтобы нам было проще оценить твои навыки и креативность в подходе к решению проблем (нам это важно 😎).

Представь проблему: Команда не может организованно вести список тасок. У каждого сотрудника есть свои хотелки к системе. Необходимо предоставить максимально приемлемый вариант реализации приложения, который устроит наибольшее количество пользователей.

Хотелки:
- Петя: Я хочу, чтобы можно было выгружать проект в файл, чтобы я мог прийти домой и открыть его там. Но я не хочу синхронизацию через клауд сервисы. Это небезопасно.

- Вася: Я привык работать с тысячами открытых вкладок браузера. Если в самой вкладке будут еще вкладки (подпроекты) - это будет меня бесить. Хочу, чтобы каждая открытая вкладка приложения была отдельным новым проектом, чтобы я их мог менеджить как и все мои вкладки через браузер!

- Коля: В одной популярной программе по работе с тасками очень плохо сделана фильтрация. Я хочу, чтобы когда я настраиваю фильтр - он, мать его, сохранялся при перезагрузке страницы! Было бы не плохо давать возможность создавать свой пресет фильтров для быстрого применения.

- Иван: Вот что должно происходить, когда кликаешь по таске? Правильно, должно открыться описание таски. Но другие сервисы посылают меня на новую страницу. Зачем? ведь есть модалки и их все любят! Максимум что я потерплю - выползающее нечто, которое не блокирует пользовательский интерфейс.

- Максим: Мне мало платят и я не могу себе позволить мак бук. или любой другой бук. У меня дома стоит Pentium 3 и там XP и старый браузер, который я не могу обновить. Он говорит, что я должен сначала обновить систему. Но я ничего ему не должен! Короче, я работаю из дома и на плохом компе. Пусть не виснет и работает!

- Марсель: Я ценитель прекрасного и хочу, чтобы любой софт, который я запускаю на своей машине обладал такими же восхитительными анимациями, как и моя любимая и самая крутая операционная система ♥

- Дима: Я ненавижу клавиатуры. Зачем их придумали, если есть тач скрин? Я хочу все двигать пальцами с телефона или планшета. Запилите плиз тач саппорт.

- Маша: Я хочу работать с коллегой над одним проектом. И было бы классно видеть в моей вкладке то, что делает он в своей.

</details>

---

Всё, что не указано в требованиях, остаётся на усмотрение исполнителя задачи.

Опциональные требования сложности, которая выше текущей выполняемой, допустимы к имплементации и дадут дополнительные баллы.\
Например, если вы решили выполнять задачу на сложности **medium**, выполнение опциональных требований из сложности **hard** даст преимущество при итоговой оценке.

<details><summary>FAQ</summary>

Q: Пытаюсь сделать фичу Х - перепробовал все варианты! Она не реализуема! Можно ли не делать фичу X?\
A: Все требования реализуемы - мы проверяли сами. Скорее всего, решение проблемы либо нетипичное, либо вы его ещё не нагуглили. 😉

Q: Если я делаю, например, сложность medium - могу ли я не делать опциональные требования сложности easy?\
A: Нет. Все требования всех предыдущих сложностей являются обязательными для вашей текущей сложности!

</details>

---

## Процесс выполнения задачи

1. Сделать Fork этого репозитория;
2. Выполнить задачу;
3. Сделать Pull-Request в этот репозиторий.\
   Описание должно содержать:
   - Список выполненных требований;
   - Инструкцию по запуску/развёртыванию приложения на Windows/Unix.

Soft Deadline:
 - 7 дней, с момента создания собственного Fork-а - для сложностей easy, medium и hard.
 - 14 дней, с момента создания собственного Fork-а - для сложности [Insane](#insane) - не считая времени на опциональные задачи.
