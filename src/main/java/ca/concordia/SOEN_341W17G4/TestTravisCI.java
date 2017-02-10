package ca.concordia.SOEN_341W17G4;

public class TestTravisCI {
    static String sumStr(String a, String b) {
        return new StringBuilder().append(a).append(b).toString();
    }

    static String sumStrWithSpace(String a, String b) {
        return new StringBuilder().append(a).append(" ").append(b).toString();
    }

    public static void main(String args[]) {
        System.out.print(sumStrWithSpace("Hello,","World!"));
        //System.out.print(sumStr("Hello","World!"));
    }
}

