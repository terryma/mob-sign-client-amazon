S9Multipack=true;
S9MultipackRegistry={};
amznJQ.onReady("jQuery",function(){(function(b){var e=b(window);
var d=false;
e.load(function(){d=true
});
b.fn.s9Multipack=function(g){var f={minItems:3,maxItems:7,minItemWidth:155,seeded:false,seedHeaderBottomPadding:0,deferImageFlip:false,containerHorizontalPadding:0,suppressInitialResize:false};
g=b.extend({},f,g);
this.each(function(){new a(b(this),g)
});
return this
};
function c(i){var g;
function f(){if(!g){h();
g=setTimeout(function(){h();
g=null
},500)
}}function h(){var j=true;
b.each(S9MultipackRegistry[i],function(){this.updateSizes(j);
j=false
})
}return{handleResizeEvent:f}
}function a(i,j){this.options=j;
this.updateSizes=x;
this.getColumnCount=h;
if(!window.S9MultipackResizer){throw"window.S9MultipackResizer not found on "+i[0].id
}var v=b(".s9SeedItem",i);
var t=b(".s9OtherItems",i);
var r=b(".asin",t);
var s=i.parents(".unified_widget, .widget");
s.addClass("s9Multipack");
var g=s.parent()[0].id;
var A,o,p,f,m;
var y;
if(j.seeded){A=b(".asin",v);
o=b(".s9_header.seed_header, .s9_header_o.seed_header_o",v);
f=o.children();
p=b(".s9_header.other_header, .s9_header_o.other_header_o",t);
m=p.children();
y=p.height();
var l=parseInt(p.css("margin-bottom"),10);
if(l>0){y+=l
}}else{y=0
}var z=j.minItems;
var u=z;
if(!j.suppressInitialResize){x(true,true)
}w(this);
if(jQuery.browser.msie){n()
}i.data("s9Multipack",this);
function w(C){var B=S9MultipackRegistry[g];
if(!B){B=S9MultipackRegistry[g]=[];
S9MultipackRegistry[g].master=C;
e.resize(new c(g).handleResizeEvent)
}B.push(C);
i.bind("s9MultipackResize",function(E,D){x(true,D)
})
}function x(D,B){var E,C;
E=S9MultipackResizer(i[0],j.minItems,j.maxItems,j.minItemWidth,j.seeded,j.containerHorizontalPadding,!D);
C=E.potentialCols;
if(B||C!=u){u=C;
z=E.cols;
setTimeout(function(){k();
if(j.seeded){q()
}});
i.trigger("s9MultipackColumnCountChanged",E)
}}function q(){var B=Math.max(f[0].offsetHeight,m[0].offsetHeight);
o.css("height",B+"px");
p.css("height",B+"px");
i.css("padding-bottom",B+(j.seedHeaderBottomPadding?j.seedHeaderBottomPadding:0)+"px")
}function k(){if(j.deferImageFlip&&!d){e.load(k);
return
}var B=function(C){C.find("img").each(function(){if(this.getAttribute("url")){var D=b(this);
D.attr({src:D.attr("url"),url:""})
}})
};
B(r.slice(0,z));
if(j.seeded){B(A)
}}function n(){if(!d){e.load(function(){setTimeout(function(){x(true)
})
})
}}function h(){return z
}}amznJQ.declareAvailable("s9Multipack")
})(jQuery)
});