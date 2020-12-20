# memo-pad

## 개요

이 메모장은 자바스크립트 프레임워크과 웹 컴포넌트 API를 사용하지 않고 순수 JS Class 만으로 재사용 가능한 독립적 기능을 가진 컴포넌트를 구현하고자 노력하였다.<br>

선언형 프로그래밍을 가능하게 해주던 프레임워크의 데이터 바인딩 기반 DOM 자동 업데이트가 없으니 캡슐화된 데이터 기반의 컴포넌트를 구현하여 View 와 Data 간의 상호 의존성을 제거하였다.

### 구성요소

1. Container (src/index.ts) : Memo 컴포넌트를 감싸는 컨테이너 스코프로 Memo 컴포넌트와 상호작용하며 전체적인 상태를 관리

2. Memo (src/components/Memo/Memo.ts) : Memo 카드 내부의 데이터와 동작을 캡슐화하여 관리 <br>

Memo 컴포넌트의 내부 데이터를 관리하는데 로직을 집중하고 화면을 갱신하는 작업은 this.render() 메서드를 통하여 view 를 갱신하는 과정을 간략화하였다.<br>

constructor > render > mount > didmount > destory 생명주기를 가진다.<br>
