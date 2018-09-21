<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
        <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo">
      </div>

      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>

      <hr>

      <button v-on:click="logout" class="btn btn-block btn-outline-primary">Logout</button>
    </nav>

    <div id="content">
      <h1>About</h1>
    </div>
  </div>
</template>
