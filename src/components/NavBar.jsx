


import '../components/NavBar.css';
 export default function NavBar(){
    return(
        
          <div class=" hidden md:flex fixed top-0 items-center h-20 w-full justify-between bg-gradient-to-r from-white via-stone-300 to-stone-400 z-20">
            <div class="mt-2 ml-8 flex space-x-1  transition-all hover:scale-110 duration-300" id="op">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="40" fill="currentColor" class="bi bi-lungs" viewBox="0 0 16 16">
  <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79 1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357z"/>
</svg>
              <p class="text-2xl font-bold mt-2  " id="logo">X-Enhance</p>
            </div>
            <div class="mt-2  flex space-x-10 mr-8">
            <a class="text-md font-light text-gray-700 transition-all duration-400 hover:bg-black rounded-full px-4 py-2 hover:text-white text-xl" href="#home">Home</a>
            <a class="text-md font-light text-gray-700 transition-all duration-400 hover:bg-black rounded-full px-4 py-2 hover:text-white text-xl" href="#demo">Demo</a>
            <a class="text-md font-light text-gray-700 transition-all duration-400 hover:bg-black rounded-full px-4 py-2 hover:text-white text-xl" href="#about">About</a>
            <a class="text-md font-light text-gray-700 transition-all duration-400 hover:bg-black rounded-full px-4 py-2 hover:text-white text-xl" href="#suggestions">Suggestions</a>
            </div>
            
          </div>
        
    )
 }