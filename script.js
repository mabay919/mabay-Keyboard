 // speech 
 window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 const recognition = new SpeechRecognition();
 recognition.interimResults = true;
recognition.lang = "";
 


 recognition.addEventListener('result', e => {
   const resText = Array.from(e.results)
     .map(result => result[0])
     .map(result => result.transcript)
     .join('');

     
    

     if (e.results[0].isFinal) {
     document.querySelector('.use-keyboard-input').value += " " + resText;
     }
 });



let langChuse;
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        input : null,
    },

     eventHandlers: {
         oninput: null,
         onclose: null
     },

     properties: {
         value: '',
         capsLock: false,
         language: false,
         shift: false,
         valStart : 0,
         valEnd: 0,
         valDef: 0,
         direction: "none",
         mic: false,
         music: false,
     },

     init() {
        //for create elements Dom
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement('div');


        //for class of element

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        //add to DOM
        
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

 

   
       
        

        this.elements.input = document.querySelector('.use-keyboard-input');

        

        document.addEventListener("keydown", (key) => {
            if (this.properties.language) {
                if (key.which === 13) {
                    // console.log(this.elements.keys);
                    this._togglePlaing(this.elements.keys[35]);
            } 
            if (key.which === 16) {
                this.properties.shift = !this.properties.shift;
                this.elements.keys[36].classList.toggle('keyboard__key--active', this.properties.shift);
                this._toggleShift();
                this._togglePlaing(this.elements.keys[36]);
            
                

            }  
            if (key.which === 20) {
                
                this._togglePlaing(this.elements.keys[24]);
                this._toggleCapsLock();
                this.elements.keys[24].classList.toggle('keyboard__key--active', this.properties.capsLock);

            }    
            if (key.which === 32) {
                
                this._togglePlaing(this.elements.keys[52]);

            }     
            if (key.which === 37) {
                
                this._togglePlaing(this.elements.keys[53]);

            }   
            if (key.which === 39) {
                
                this._togglePlaing(this.elements.keys[54]);

            }  
            if (key.which === 8) {
                
                this._togglePlaing(this.elements.keys[12]);

            }
        } else {
            if (key.which === 13) {
                this._togglePlaing(this.elements.keys[38]);

            }
            if (key.which === 16) {
                this.properties.shift = !this.properties.shift;
                this.elements.keys[39].classList.toggle('keyboard__key--active', this.properties.shift);
                this._toggleShift();
                this._togglePlaing(this.elements.keys[39]);
            
                

            }  
            if (key.which === 20) {
                
                this._togglePlaing(this.elements.keys[26]);
                this._toggleCapsLock();
                this.elements.keys[26].classList.toggle('keyboard__key--active', this.properties.capsLock);

            }    
            if (key.which === 32) {
                
                this._togglePlaing(this.elements.keys[56]);

            }     
            if (key.which === 37) {
                
                this._togglePlaing(this.elements.keys[57]);

            }   
            if (key.which === 39) {
                
                this._togglePlaing(this.elements.keys[58]);

            }  
            if (key.which === 8) {
                
                this._togglePlaing(this.elements.keys[12]);

            }  
            }
          
            
            });
        
        

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue =>{
                    element.value = currentValue;
                });
                element.addEventListener("keypress", (key) => {
                    for (let butt of this.elements.keys){
                        if (key.key.toLowerCase() === butt.textContent.toLowerCase()) {
                            this._togglePlaing(butt);
                        }                       
                    }
                    // this._triggerEvent("oninput");
                    // this.properties.value += key.key;
                    // ++this.elements.input.selectionStart;
                    // ++this.elements.input.selectionEnd;
                    
                    document.querySelector(".use-keyboard-input").focus();
                    // this.elements.input.selectionStart =  this.properties.valStart;
                    // this.elements.input.selectionEnd = this.properties.valEnd;
                });
            });
        });

        document.querySelector(".use-keyboard-input").addEventListener('click', () => {
            console.log(document.querySelector(".use-keyboard-input").selectionStart);
            
            this.properties.valStart = this.elements.input.selectionStart;
            this.properties.valEnd = this.elements.input.selectionEnd;



         });



     },

     _createKeys() {
        const fragment = document.createDocumentFragment();
    const keyLayoutEN = [
      ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      ["`", "~"],"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", [";", ":"],  "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ["\\", "|"], ["/", "?"], [",", "<"], [".", ">"], 
      "sound", "done", "mic", "en", "space", "left", "right"
    ];

    const keyLayoutRu = [
        ["1", "!"], ["2", "\""], ["3", "№"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
        "ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ["\\", "/"], [",", "<"], [".", ">"],
        "sound", "done", "mic", "ru", "space", "left", "right"
      ];

    // cerate elemens with iconns
      
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        }

        
        if (this.properties.language) {
            langChuse = keyLayoutEN;
            
        } else {
           
            langChuse = keyLayoutRu;
            
        }


       


        langChuse.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ["backspace", "p", "enter", "ъ", ["?", "/"]].includes(key);

            //add atributes/classes

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");



            switch(key) {
                
                case "sound":
                    keyElement.classList.add("keyboard__key", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("hearing");

                    keyElement.addEventListener("click", () => {
                          // sound
                   if (!this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="sound"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }


                this.properties.music = !this.properties.music;
                keyElement.classList.toggle('keyboard__key--active', this.properties.music);
                        
                      
                      
                    });

                    break;
                case "left":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    keyElement.addEventListener("click", () => {
                          // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="left"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }


                        document.querySelector(".use-keyboard-input").focus();
                        this.properties.valStart = --this.elements.input.selectionStart;
                        this.properties.valEnd = --this.elements.input.selectionEnd;
                      
                      
                    });

                    break;
                    case "right":
                        keyElement.classList.add("keyboard__key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
    
                        keyElement.addEventListener("click", () => {
                            document.querySelector(".use-keyboard-input").focus();
                            this.properties.valStart = ++this.elements.input.selectionStart;
                        this.elements.input.selectionEnd = (this.elements.input.selectionEnd - 1) + 1;
                        this.properties.valEnd = this.elements.input.selectionEnd;

                        // sound
                        if (this.properties.music) {
                         const audio = document.querySelector(`audio[data-key="right"]`);

                        if (!audio) return;

                        
                        audio.currentTime = 0;
                        audio.play();
                        }
                       
                      
                        });
    
                        break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("text_rotate_up");
                   
                    keyElement.addEventListener("click", () => {
                        this.properties.shift = !this.properties.shift;
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
                        this._toggleShift();

                           // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="shift"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                    });

                    break;
                case "ru":
                    keyElement.classList.add("keyboard__key-lang");
                    // keyElement.innerHTML = createIconHTML("language");
                    keyElement.innerHTML = "ru";

                    keyElement.addEventListener("click", () => {
                        document.querySelector(".use-keyboard-input").focus();

                     this.properties.language = !this.properties.language;
                     while (this.elements.keysContainer.children.length>0) {
                         this.elements.keysContainer.children[0].remove();
                        }
                     this.elements.keysContainer.appendChild(this._createKeys());
                     this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
                        
                        // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="ru"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                    });

                    break;

                    case "en":
                    keyElement.classList.add("keyboard__key-lang");

                    // keyElement.innerHTML = createIconHTML("language");
                    keyElement.innerHTML = "en";

                    keyElement.addEventListener("click", () => {
                        document.querySelector(".use-keyboard-input").focus();
                        
                     this.properties.language = !this.properties.language;
                     while (this.elements.keysContainer.children.length > 0) {
                         this.elements.keysContainer.children[0].remove();
                         }
                         this.elements.keysContainer.appendChild(this._createKeys());
                         this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

                        // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="ru"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                    });

                    break;

                    case "mic":
                        keyElement.classList.add("keyboard__key-mic", "keyboard__key--activatable");
                        keyElement.innerHTML = createIconHTML("mic");
    
                        keyElement.addEventListener("click", () => {
                            document.querySelector(".use-keyboard-input").focus();
                           
    
                         this.properties.mic = !this.properties.mic;
                         keyElement.classList.toggle('keyboard__key--active', this.properties.mic);
                            console.log("Micropone on: " + this.properties.mic);
                            if (this.properties.language) {
                                recognition.lang = "en-US";
                                
                            } else {
                                recognition.lang = "ru-RU";
                                
                            }
                            if (this.properties.mic) {
                                recognition.addEventListener('end', recognition.start);
                                recognition.start();
                                console.log("Speech language: " + recognition.lang);
                            } else {
                                recognition.removeEventListener('end', recognition.start);
                                recognition.stop();
                                
                            }
                            
                            
                               // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="speech"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                        });
    
                        break;

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        
                        this.properties.value = document.querySelector('.use-keyboard-input').value;
                        this.properties.value = this.properties.value.substring(0, this.elements.input.selectionStart - 1) + 
                        this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length);
                        this.properties.valStart = --this.elements.input.selectionStart;
                        this.properties.valEnd = --this.elements.input.selectionEnd;
                              
                       
                        this._triggerEvent("oninput");
                         document.querySelector(".use-keyboard-input").focus();
                         this.elements.input.selectionStart =  this.properties.valStart;
                         this.elements.input.selectionEnd = this.properties.valEnd;

                            // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="backsp"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        document.querySelector(".use-keyboard-input").focus();

                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);

                           // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="caps"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                    });

                    break;

                    case "enter":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");
    
                        keyElement.addEventListener("click", () => {
  
                            this.properties.value = document.querySelector('.use-keyboard-input').value;
                            this.properties.value = this.properties.value.substring(0, this.elements.input.selectionStart) + "\n" +
                            this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length);
                            this.properties.valEnd = ++this.elements.input.selectionEnd;
                            this.properties.valStart = ++this.elements.input.selectionStart;
                        

                            this._triggerEvent("oninput");
                            document.querySelector(".use-keyboard-input").focus();
                            this.elements.input.selectionStart =  this.properties.valStart;
                            this.elements.input.selectionEnd = this.properties.valEnd;

                               // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="enter"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                        });
    
                        break;

                    case "space":
                        keyElement.classList.add("keyboard__key--extra-wide");
                        keyElement.innerHTML = createIconHTML("space_bar");
    
                        keyElement.addEventListener("click", () => {
                         
                            this.properties.value = document.querySelector('.use-keyboard-input').value;
                            this.properties.value = this.properties.value.substring(0, this.elements.input.selectionStart) + " " +
                            this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length);
                            this.properties.valEnd = ++this.elements.input.selectionEnd;
                            this.properties.valStart = ++this.elements.input.selectionStart;
                            
                            this._triggerEvent("oninput");
                            document.querySelector(".use-keyboard-input").focus();
                            this.elements.input.selectionStart =  this.properties.valStart;
                            this.elements.input.selectionEnd = this.properties.valEnd;

                               // sound
                   if (this.properties.music) {
                    const audio = document.querySelector(`audio[data-key="space"]`);

                   if (!audio) return;

                   
                   audio.currentTime = 0;
                   audio.play();
                   }
                        });
    
                        break;
                    
                    case "done":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                        keyElement.innerHTML = createIconHTML("check_circle");
    
                        keyElement.addEventListener("click", () => {
                            this.close();
                            this._triggerEvent("onclose");
                        });
    
                        break;

                    default:
                        if (typeof key === "string") {
                            keyElement.classList.add("letter");
                              keyElement.textContent = key.toLowerCase();
    
                        keyElement.addEventListener("click", () => {
                            
                            

                            this.properties.value = document.querySelector('.use-keyboard-input').value;
                            if (this.properties.capsLock && this.properties.shift) {
                                this.properties.value = (this.properties.value.substring(0, this.elements.input.selectionStart) + key.toLowerCase() +
                                this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length))
                            } else if (!this.properties.capsLock && !this.properties.shift) {
                                this.properties.value = (this.properties.value.substring(0, this.elements.input.selectionStart) + key.toLowerCase() +
                                this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length))
                            } else {
                                this.properties.value = (this.properties.value.substring(0, this.elements.input.selectionStart) + key.toUpperCase() +
                                this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length))
                            }
                           
                            
                            this.properties.valEnd = ++this.elements.input.selectionEnd;
                            this.properties.valStart = ++this.elements.input.selectionStart;
                            
                            this._triggerEvent("oninput");
                            document.querySelector(".use-keyboard-input").focus();
                            this.elements.input.selectionStart =  this.properties.valStart;
                            this.elements.input.selectionEnd = this.properties.valEnd;

                            
                            this._soundAllButt();
                        });
                        } else {
                            if (!this.properties.shift) {
                                keyElement.classList.add("letter");
                                keyElement.textContent = key[0];
                                keyElement.addEventListener("click", () => {
                                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                                    this.properties.value = this.properties.value.substring(0, this.elements.input.selectionStart) + key[0] +
                                    this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length);
                                    this.properties.valEnd = ++this.elements.input.selectionEnd;
                                    this.properties.valStart = ++this.elements.input.selectionStart;
                                    this._triggerEvent("oninput");
                                    document.querySelector(".use-keyboard-input").focus();
                                    this.elements.input.selectionStart =  this.properties.valStart;
                                    this.elements.input.selectionEnd = this.properties.valEnd;

                                    this._soundAllButt();
                                })
                                
                            } else {
                                keyElement.classList.add("letter");
                                    keyElement.textContent = key[1];
                                    keyElement.addEventListener("click", () => {
                                        this.properties.value = document.querySelector('.use-keyboard-input').value;
                                        this.properties.value = this.properties.value.substring(0, this.elements.input.selectionStart) + key[1] +
                                        this.properties.value.substring(this.elements.input.selectionEnd, this.properties.value.length);

                                        this.properties.valEnd = ++this.elements.input.selectionEnd;
                                        this.properties.valStart = ++this.elements.input.selectionStart;
                                        this._triggerEvent("oninput");
                                        document.querySelector(".use-keyboard-input").focus();
                                        this.elements.input.selectionStart =  this.properties.valStart;
                                        this.elements.input.selectionEnd = this.properties.valEnd;
                                        
                                        this._soundAllButt();
                                    })
                            }
  
                            
                        }
                      
    
                        break;

            }

            fragment.appendChild(keyElement);

            if (insertLineBreak || key[0] === "." || key[0] === ">") {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
     },

     _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _togglePlaing(butt) {
        butt.animate({
            opacity: [0, 1],
            backgroundColor: ["rgb(54, 245, 60);", "rgb(54, 245, 60);"],
        }, 200);
    },

    _soundAllButt() {
           // sound
            if (!this.properties.language) {
                        
                         if (this.properties.music) {
                             const audio = document.querySelector(`audio[data-key="all_butt"]`);
            
                         if (!audio) return;
            
                         
                         audio.currentTime = 0;
                         audio.play();
                         }
                 } else {
                     
                         if (this.properties.music) {
                             const audio = document.querySelector(`audio[data-key="allEn"]`);
            
                         if (!audio) return;
            
                         
                         audio.currentTime = 0;
                         audio.play();
                         }
                 }
    
    },

    _toggleShift() {
        document.querySelector(".use-keyboard-input").focus();
                        
                        for (const key of this.elements.keys) {
                            if (key.childElementCount === 0) {
                                
                                if (this.properties.capsLock && this.properties.shift) {
                                    key.textContent = key.textContent.toLowerCase();
                                } else  if (this.properties.shift && !this.properties.capsLock) {
                                    key.textContent = key.textContent.toUpperCase();
                                } else if (this.properties.capsLock) {
                                    key.textContent = key.textContent.toUpperCase();
                                } else {
                                    key.textContent = key.textContent.toLowerCase();
                                }
                               
                            } 
                            for (let i = 0; i < langChuse.length; i += 1) {
                                if (typeof langChuse[i] !== "string") {
                                   
                                    
                                    langChuse[i].reverse();
                                    
                                    for (const key of this.elements.keys) {
                                        if (key.textContent === langChuse[i][1]) {
                                                                 
                                            key.textContent = langChuse[i][0];
                                            
                                            
                                        }
                                    }
                                }
                            }
                        }
    },

     _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;  

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (this.properties.capsLock && this.properties.shift) {
                    key.textContent = key.textContent.toLowerCase();
                } else  if (this.properties.capsLock && !this.properties.shift) {
                    key.textContent = key.textContent.toUpperCase();
                } else if (this.properties.shift) { 
                    key.textContent = key.textContent.toUpperCase();
                } else {
                    key.textContent = key.textContent.toLowerCase();
                }
                
            }
        }
     },


     open(initialValue, oninput, onclose) {

        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');

     },

     close() {
         this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');

     }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    
    
});


