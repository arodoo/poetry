/*
 File: ETagPort.java
 Purpose: Application port to compute ETag values for resources.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.common.port;

public interface ETagPort {
    String compute(String canonical);
}
