<script>
  import {Observable} from 'rxjs';

  let valuesLeft = ["Waiting..."];
  let valuesRight = ["Waiting..."];

  const promise = new Promise((resolve, reject) => {
    resolve(["Hello ... Is there anybody out there?"]);
    //reject();
    // setTimeout(() => {
    //   resolve(["Hello ... Is there anybody out there?"]);
    // }, 3000);
  });

  const observable = new Observable(subscriber => {
    // subscriber.next("Hello");
    // subscriber.next("...")
    // subscriber.next("Is there anybody out there?");
    // subscriber.complete(); // subscriber.error();
    setTimeout(() => subscriber.next("Hello"), 1000);
    setTimeout(() => subscriber.next("..."), 2000);
    setTimeout(() => {
      subscriber.error();
      // subscriber.next("Is there anybody out there?");
      // subscriber.complete();
    }, 3000);
  });

  function runExample() {
    resetExample();
    promise.then((v) => {
      valuesLeft = [...valuesLeft, ...v]
    })
    // .catch(() => {
    //   valuesLeft = [...valuesLeft, "ERROR"];
    // })
    // .finally(() => {
    //   valuesLeft = [...valuesLeft, "Done"];
    // });

    observable.subscribe((v) => {
      valuesRight = [...valuesRight, v]
    }, () => {
      valuesRight = [...valuesRight, "ERROR"]
    }, () => {
      valuesRight = [...valuesRight, "Done"]
    });
  }
  
  function resetExample() {
	  valuesLeft = ["Waiting..."];
    valuesRight = ["Waiting..."];	
	}

</script>

<main>
	
	<h1>Promise vs Observable</h1>

	<div class="grid">
		<div class="item">
      <h2>Promise</h2>
      <ol>
		  {#each valuesLeft as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
		<div class="item">
      <h2>Observable</h2>
      <ol>
		  {#each valuesRight as item}
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
    grid-template-columns: 1fr 1fr;
    
  }
  .grid .item {
    align-content: start;
  }
</style>
