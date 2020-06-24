<script>
  import { onMount } from 'svelte';
  import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";

  const initialState = ["** Waiting **"];
  let results1 = initialState;
  let results2 = initialState;
  let results3 = initialState;

  function runExample() {
    const subject1 = new Subject();
    const subject2 = new BehaviorSubject("Initial");
    const subject3 = new ReplaySubject(3);

    // Setup first subscription
    results1 = ["** Running **"];
    subject1.subscribe(v => results1 = [...results1, v]);
    
    // Setup second subscription
    results2 = ["** Running **"];
    subject2.subscribe(v => results2 = [...results2, v]);

    // Setup third subscription
    setTimeout(() => {
      results3 = ["** Running **"];
      subject3.subscribe(v => results3 = [...results3, v]);
    }, 3000);

    setTimeout(() => {
      subject1.next("Value 1");
      subject2.next("Value 1");
      subject3.next("Value 1");
    }, 1000); 

    setTimeout(() => {
      subject1.next("Value 2");
      subject2.next("Value 2");
      subject3.next("Value 2");
    }, 2000); 
  }

  function resetExample() {
	  results1 = initialState;
    results2 = initialState;
    results3 = initialState;
	}
</script>

<main>
	
	<h1>Subjects</h1>
  
	<div class="grid">
		<div class="item">
      <h2><a href="https://rxjs.dev/guide/subject#subject">Subject</a></h2>
      <ol>
		  {#each results1 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/guide/subject#behaviorsubject">BehaviorSubject</a></h2>
      <ol>
		  {#each results2 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/guide/subject#replaysubject">ReplaySubject</a></h2>
      <ol>
		  {#each results3 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
	</div>

</main>

<footer>
  <button on:click={runExample}>Run</button>
  <button on:click={resetExample}>Reset</button>
</footer>

<style>
  footer {
		margin-top: 20px;
	}

  li {
    margin: 10px 0 10px 0;
  }

  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
  }
  .grid .item {
    align-content: start;
  }
</style>
